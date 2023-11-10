import cv2
import numpy as np

# Load YOLOv4 model and weights
net = cv2.dnn.readNet(r"D:\Yolov4Website\ThesisWebsite\darknet\cfg\yolov4-obj.cfg", r"D:\Yolov4Website\ThesisWebsite\darknet\weights\yolov4-obj_8000.weights")

# Load class names for the 9 vehicle types
classes = ["bus", "car", "jeepney", "motorcycle", "tricycle", "truck", "van", "pickup", "bicycle"]

# Load the image
image = cv2.imread(r"D:\Yolov4Website\ThesisWebsite\darknet\data\test2.jpg")

# Prepare the image for YOLOv4
blob = cv2.dnn.blobFromImage(image, 1/255.0, (416, 416), swapRB=True, crop=False)
net.setInput(blob)

# Run inference
outs = net.forward(net.getUnconnectedOutLayersNames())

# Initialize counters for each vehicle type
vehicle_counts = {cls: 0 for cls in classes}

# List to store bounding boxes and their confidences
boxes = []

# Iterate through detected objects
for out in outs:
    for detection in out:
        scores = detection[5:]
        class_id = np.argmax(scores)
        confidence = scores[class_id]
        if confidence > 0.5:
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

# Apply non-maximum suppression to keep only the most confident bounding boxes
if len(boxes) > 0:
    boxes = np.array(boxes)
    confidences = boxes[:, 4]
    class_ids = boxes[:, 5]
    
    unique_classes = set()

    indices = cv2.dnn.NMSBoxes(boxes[:, :4].tolist(), confidences.tolist(), 0.5, 0.3)

    # Iterate through the filtered bounding boxes
    for i in indices:
        i = i
        x, y, width, height, _, class_id = boxes[i]

        detected_class = classes[int(class_id)]
        vehicle_counts[detected_class] += 1

# Print the counts for each vehicle type
for cls, count in vehicle_counts.items():
    print(f"Number of {cls}s detected: {count}")

# Display or save the image with bounding boxes
# (You can draw bounding boxes around the detected vehicles)
