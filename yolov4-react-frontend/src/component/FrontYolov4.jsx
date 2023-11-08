import React, { useState, useEffect } from 'react';

const FrontYolov4 = () => {
    const [file, setFile] = useState(null);
    const [detectionResults, setDetectionResults] = useState(null);
    const [imagePath, setImagePath] = useState('');



    useEffect(() => {
        fetch('http://127.0.0.1:5000/processed_image?path=predictions.jpg') // Adjust the 'path' parameter accordingly
          .then((response) => response.blob())
          .then((data) => {
            const url = URL.createObjectURL(data);
            setImagePath(url);
          })
          .catch((error) => {
            console.error('Error fetching image:', error);
                    window.location.reload();

          });
      }, []);
      
    
      console.log('ImagePath:', imagePath); // Debugging: Log the imagePath to the console

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST', // Make sure it's a POST request
                body: formData,
            });;

            if (response.ok) {
                const data = await response.json();
                setDetectionResults(data);
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        // <div>
        //     <h1>YOLOv4 Object Detection</h1>
        //     <input type="file" accept="image/*" onChange={handleFileChange} />
        //     <button onClick={handleUpload}>Detect Objects</button>
        //     {/* Display the detection results here */}
        // </div>
        
        <div className="flex flex-col min-h-screen App">
        <div className="flex-grow">
        <div className="flex justify-between min-h-screen App-background">

        <div className='flex flex-col'>
            <p className="mb-10 Title-font">
                Using Pre-Trained YOLOv4 in Counting and <br />Classifiying Vehicles through Web Application
            </p>

            <div className='flex flex-col w-full h-32 p-2 bg-white border-2 rounded-lg'>
                <div className="flex flex-col items-center justify-center w-full h-32 bg-white border-2 border-gray-400 border-dashed rounded-lg">
                <label for="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                    <i className="mb-2 text-2xl text-gray-400 fas fa-cloud-upload-alt">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
    
                    </i>

                    <p className="text-sm text-gray-500">Drop Image Here</p>
                </div>
                </label>
                <input type="file" id="image-upload" onChange={handleFileChange} className="hidden" accept="image/*" />
                
            </div>
          </div>

          <button className='text-sm bg-[#1c5f36] hover:opacity-80 text-white p-2 mt-2' onClick={handleUpload}>Detect Vehicles</button>
          </div>

          {imagePath && <img src={imagePath} alt="Processed Image" />}

  
          <footer className="py-4 footer">
            Ateneo de Davao University - Computer Science Thesis - Lozano, Martirez, Quimno
          </footer>
  
        </div>
        </div>  
      </div>
    );
};

export default FrontYolov4;
