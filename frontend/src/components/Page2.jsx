import React, { useRef,useState } from 'react'
import { DeviceFrameset } from 'react-device-frameset'
import 'react-device-frameset/styles/marvel-devices.min.css'
import './Page2.css'
import scanscreen from '../assets/scanscreen.png'
import axios from 'axios'
function Page2() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [response,setresponse]=useState(null);
    const inputref=useRef(null);
    // Handle image selection
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    };
  
    // Handle image upload to the server
    const handleImageUpload = async () => {
      if (!selectedImage) return;
  
      // Prepare form data
      const formData = new FormData();
      formData.append('image', selectedImage);
  
      try {
        // Send a POST request to the server
         const response = await axios.post('http://192.168.31.52:5000/detect', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          setresponse(response.data);
       
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  return (
    <div className='page2' id='section2'>
        <DeviceFrameset device="iPhone X"  landscape={false}  >
            <img src={previewUrl!==null?previewUrl:scanscreen} className='scanscreen'></img>
        </DeviceFrameset>
        <div className='rightText'>
            {
            !response?
            <><h1><span className='grad-text'>Scan </span>Your Plants Now!</h1>
            <span style={{width:'500px',textAlign:'left',marginBottom:'20px'}}>Identify plant diseases early to prevent yield loss, reduce costs, and boost productivity. Our advanced AI-powered tool provides rapid analysis from just a photo, delivering accurate diagnoses and actionable insights for healthier crops and a more sustainable future.</span>
            </>:
             <><h1 style={{width:'80px',textWrap:'wrap'}}><span className='grad-text'>Disease: </span>{response}</h1>
             <span style={{width:'500px',textAlign:'left',marginBottom:'20px'}}>Identify plant diseases early to prevent yield loss, reduce costs, and boost productivity. Our advanced AI-powered tool provides rapid analysis from just a photo, delivering accurate diagnoses and actionable insights for healthier crops and a more sustainable future.</span>
             </>
            }
             <div style={{display:'flex',justifyContent:'space-between',width:'300px'}}>
            <input type="file" onChange={handleImageChange} style={{display:'none'}} ref={inputref}/>
            <button style={{borderRadius:'3px'}} onClick={()=>{inputref.current.click();}}>Upload</button>
            <button className='button-33' onClick={handleImageUpload}><i class="animation"></i>Detect<i class="animation"></i></button>
          
            </div>
        </div>
    </div>
  )
}

export default Page2