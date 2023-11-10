import React, { useState, useEffect } from 'react';

const FrontYolov4 = () => {
    const [file, setFile] = useState(null);
    const [detectionResults, setDetectionResults] = useState(null);
    const [imagePath, setImagePath] = useState(null);
    const [vehicleCounts, setVehicleCounts] = useState({});
    const [loading, setLoading] = useState(false);
    const [avgPrecision, setAvgPrecision] = useState({});





    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        console.log(file)
    };
    const handleReload = (event) => {
        window.location.reload();
        // Your form submission logic here
      }

    const handleUpload = async () => {
        if (!file) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setDetectionResults(data);
                setVehicleCounts(data.vehicle_counts);
                setImagePath(data.image_url);
                setAvgPrecision(data.average_precision)
                console.log(data.image_url)
                console.log(data.average_precision)

            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className="flex flex-col justify-between flex-grow h-screen App App-background bg-red-200">
        <main className='mt-2'>

            {!detectionResults ? (

             
                    <div className='flex flex-col'>
                           <div className='m-20'></div>
                            <p className="mb-10 Title-font">
                                 Using Pre-Trained YOLOv4 in Counting and <br />Classifiying Vehicles through Web Application
                         </p>
                
                             <div className='flex flex-col w-full h-15 p-2 bg-white border-2 rounded-lg'>
                                 <div className="flex flex-col items-center justify-center w-full h-15 p-3 bg-white border-2 hover:bg-gray-200 cursor-pointer border-gray-400 border-dashed rounded-lg">
                                 <label for="image-upload" className="cursor-pointer">
                                 <div className="flex flex-col items-center">
                                     <i className="mb-2 text-3xl text-gray-400 fas fa-cloud-upload-alt">
                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                 </svg>
                    
                                     </i>
                
                                     <p className="text-xs text-gray-500">Upload Image Here</p>
                                     
                                 </div>
                                 </label>
                                 <input type="file" id="image-upload" onChange={handleFileChange} className="hidden" accept="image/*" />
                                 {file && (
                                        <p className='text-black text-sm font-semibold p-2 mt-3 bg-white rounded-xl '>Selected Image:  {file.name}</p>
                                    )}
                             </div>
                             <button className='text-sm bg-[#1c5f36] hover:opacity-80 text-white p-2 mt-2' onClick={handleUpload}>
                        Detect Vehicles
                    </button>
                           </div>
                     </div>
      
            ) : (
                <>
                  <p className="my-10 Title-font">
                    Using Pre-Trained YOLOv4 in Counting and <br />Classifiying Vehicles through Web Application
                </p>
                    <div className='flex justify-center items-center'>
                    {/* Display processed image */}
                        <div className='w-full min-h-10 flex justify-center items-center m-4 gap-3 text-black'>
                            {imagePath && <img className='max-w-md' src={"http://127.0.0.1:5000/processed_image?path=predictions.jpg"} alt="Processed Image" />}
                        </div>

                        {/* Display vehicle count */}
                        <table className="border-collapse w-full">
                            <thead className="bg-green-700">
                                <tr>
                                    <th className="py-2 px-4 border text-sm">Vehicle Type</th>
                                    <th className="py-2 px-4 border text-sm">Count</th>
                                    <th className="py-2 px-4 border text-sm">Average Precision</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Object.entries(vehicleCounts).map(([vehicleType, count]) => {
                                const avgPrecisionValue = avgPrecision[vehicleType];

                                return (
                                    <tr key={vehicleType}>
                                        <td className="bg-white text-black py-2 px-4 border text-sm">{vehicleType}</td>
                                        <td className="bg-white text-black py-2 px-4 border text-sm">{count}</td>
                                        <td className="bg-white text-black py-2 px-4 border text-sm">{(avgPrecisionValue * 100).toFixed(2)}%</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        </table>
                    </div>

                    <button className='m-4 bg-white p-3 text-sm text-black font-semibold rounded-lg hover:bg-green-900 hover:text-white' onClick={handleReload} >Try and Upload New Image Again</button>
                </>
            )}
        </main>
        <footer className="py-4 footer">
            Ateneo de Davao University - Computer Science Thesis - Lozano, Martirez, Quimno
        </footer>
    </div>

    //     <div className="flex flex-col justify-between flex-grow h-screen App App-background bg-red-200">
    //     <main className='mt-2'> 
    //     <div className='flex flex-col'>
    //         <p className="mb-10 Title-font">
    //             Using Pre-Trained YOLOv4 in Counting and <br />Classifiying Vehicles through Web Application
    //         </p>

    //         <div className='flex flex-col w-full h-15 p-2 bg-white border-2 rounded-lg'>
    //             <div className="flex flex-col items-center justify-center w-full h-15 p-3 bg-white border-2 border-gray-400 border-dashed rounded-lg">
    //             <label for="image-upload" className="cursor-pointer">
    //             <div className="flex flex-col items-center">
    //                 <i className="mb-2 text-3xl text-gray-400 fas fa-cloud-upload-alt">
    //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    
    //                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    //                 </svg>
    
    //                 </i>

    //                 <p className="text-xs text-gray-500">Upload Image Here</p>
    //             </div>
    //             </label>
    //             <input type="file" id="image-upload" onChange={handleFileChange} className="hidden" accept="image/*" />
                
    //         </div>
    //       </div>

    //       <button className='text-sm bg-[#1c5f36] hover:opacity-80 text-white p-2 mt-2' onClick={handleUpload}>Detect Vehicles</button>
    //       <div className='w-full min-h-10 flex justify-center items-center m-4 gap-3 text-black'>
    //             Processed Image:
    //             {imagePath && <img className='max-w-md' src={"http://127.0.0.1:5000/processed_image?path=predictions.jpg"} alt="Processed Image" />}

    //         </div>
            
    //             {/* Display vehicle count */}
    //         {vehicleCounts && (
    //             <div className="text-lg text-black font-semibold text-center">
    //                     Vehicle Count:
    //                     {Object.entries(vehicleCounts).map(([vehicleType, count]) => (
    //                         <p key={vehicleType}>{`${vehicleType}: ${count}`}</p>
    //                     ))}
    //             </div>
    //         )}

    //       </div>
       
    //       </main>
    //       <footer className="py-4 footer">
    //         Ateneo de Davao University - Computer Science Thesis - Lozano, Martirez, Quimno
    //       </footer>
  
    //   </div>
    );
};

export default FrontYolov4;
