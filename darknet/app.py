from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import subprocess
import os
import numpy as np
import cv2  # Import OpenCV

app = Flask(__name__)
CORS(app)  # Enable CORS for your entire app

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['image']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    if file:
        image_data = file.read()

        file_path = 'image.jpg'
        file.save(file_path)
        
        with open(file_path, 'wb') as f:
            f.write(image_data)

        # Save the uploaded image to a temporary folder
        net = cv2.dnn.readNet(r"D:\Yolov4Website\ThesisWebsite\darknet\cfg\yolov4-obj.cfg", r"D:\Yolov4Website\ThesisWebsite\darknet\weights\yolov4-obj_8000.weights")
        classes = ["bus", "car", "jeepney", "motorcycle", "tricycle", "truck", "van", "pickup", "bicycle"]

        # # Load the uploaded image
        image = cv2.imdecode(np.fromstring(image_data, np.uint8), cv2.IMREAD_COLOR)
        

        # Prepare the image for YOLOv4
        blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)
        net.setInput(blob)

        # Run inference
        outs = net.forward(net.getUnconnectedOutLayersNames())

        # Initialize counters for each vehicle type
        vehicle_counts = {cls: 0 for cls in classes}
        confidence_sum_dict = {cls: 0 for cls in classes}
        confidence_count_dict = {cls: 0 for cls in classes}

        # (Rest of your detection code)
        
        boxes = []
        detected_classes = set()


        # Iterate through detected objects
        for out in outs:
            for detection in out:
                scores = detection[5:]
                class_id = np.argmax(scores)
                confidence = scores[class_id]
                if confidence > 0.3:
                    detected_class = classes[class_id]
                    if detected_class in classes:
                        center_x = int(detection[0] * image.shape[1])
                        center_y = int(detection[1] * image.shape[0])
                        width = int(detection[2] * image.shape[1])
                        height = int(detection[3] * image.shape[0])

                        # Calculate bounding box coordinates
                        x = int(center_x - width / 2)
                        y = int(center_y - height / 2)

                        # Append bounding box and confidence to the list
                        boxes.append([x, y, width, height, confidence, class_id])
                        detected_classes.add(detected_class)
                        
            
                        print("Number of unique classes detected:", len(detected_classes))
                        print("Detected Classes:", detected_classes)






        # Apply non-maximum suppression to keep only the most confident bounding boxes
        if len(boxes) > 0:
            boxes = np.array(boxes)
            confidences = boxes[:, 4]
            class_id = boxes[:, 5]
            indices = cv2.dnn.NMSBoxes(boxes[:, :4].tolist(), confidences.tolist(), 0.3, 0.3)
            print(indices)
            # Iterate through the filtered bounding boxes
            for i in indices:
                i = i
                x, y, width, height, _, class_id = boxes[i]

                detected_class = classes[int(class_id)]
                vehicle_counts[detected_class] += 1
                confidence_sum_dict[detected_class] += confidences[i]
                confidence_count_dict[detected_class] += 1
                
        average_confidence_dict = {cls: confidence_sum_dict[cls] / confidence_count_dict[cls] if confidence_count_dict[cls] > 0 else 0 for cls in classes}

        # # Print the counts for each vehicle type
        for cls, count in vehicle_counts.items():
            print(f"Number of {cls}s detected: {count}")
            print(f"Average Confidence for {cls}: {average_confidence_dict[cls]}")

        
        
 
        # Run Darknet for object detection
        darknet_cmd = f'darknet.exe detector test data/obj.data cfg/yolov4-obj.cfg weights/yolov4-obj_8000.weights {file_path} -thresh 0.3 > NUL 2>&1' 
        
        # subprocess.run(darknet_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        try:
            process = subprocess.Popen(darknet_cmd, shell=True)
            process.wait()  # Wait for the process to complete

        except subprocess.CalledProcessError as e:
            print(f"Error: {e}")
        finally:
            if process is not None:
                process.terminate()

        
            base_dir = 'D:/Yolov4Website/ThesisWebsite/darknet'  
            processed_image_path = os.path.join(base_dir, 'static', 'predictions.png')
            print("Base Dir:", base_dir)
            print("Full Image Path:", processed_image_path)
            print(file_path)
            response_data = {'vehicle_counts': vehicle_counts, 'average_precision': average_confidence_dict, 'image_url': '/static/predictions.png'}
            return jsonify(response_data)
        
    return jsonify({'error': 'Failed to upload image'})

@app.route('/processed_image')
def get_processed_image():
    
    filename = request.args.get('path')
    base_dir = 'D:/Yolov4Website/ThesisWebsite/darknet'  
    image_path = os.path.join(base_dir, filename)
    print(image_path)  # Move this line above the 'return' statement
    return send_file(image_path, mimetype='image/jpeg')




if __name__ == '__main__':
    app.run()
