from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import subprocess
import os

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
        # Save the uploaded image to a temporary folder
        file_path = 'temp.jpg'
        file.save(file_path)
  
        # Run Darknet for object detection
        darknet_cmd = f'darknet.exe detector test data/obj.data cfg/yolov4-obj.cfg weights/yolov4-obj_8000.weights {file_path} -thresh 0.3'
        try:
            result = subprocess.check_output(darknet_cmd, shell=True, universal_newlines=True)
            
            # Save the processed image with a new name (e.g., processed.jpg)
            # output_image_path = 'predictions.jpg'
            # cv2.imwrite(output_image_path, cv2.imread(file_path))

            # Serve the processed image using a new endpoint
            return jsonify({'results': result})
        except subprocess.CalledProcessError as e:
            return jsonify({'error': f'Error running Darknet: {e.returncode}'})
        
    return jsonify({'error': 'Failed to upload image'})

@app.route('/processed_image')
def get_processed_image():
    filename = request.args.get('path')
    base_dir = 'D:/Yolov4Website/darknet'  
    image_path = os.path.join(base_dir, filename)
    print(image_path)  # Move this line above the 'return' statement
    return send_file(image_path, mimetype='image/jpeg')


if __name__ == '__main__':
    app.run()
