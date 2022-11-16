/* eslint-disable no-fallthrough */
import {useState} from 'react';
import './App.css';
import axios from 'axios';
import { Player } from "video-react";

function App() {
  const [gallery, setGallery] = useState({});
  const [fyleType, setFileType] = useState('image');
  const [multiple, setMultiple] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    const chosenFiles = Array.prototype.slice.call(e.target.gallery.files)
    ///////////////////////////////////////// Upload the files
    console.log(chosenFiles)
    axios.post("http://localhost:3001/upload-images", {
      files: chosenFiles,
    }, 
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } ).then(response => console.log(response));
    ////////////////////////////////////////// Upload the files
  }

  const handleSelect = (e) => {
     const choosen = e.target.value;

     if(choosen === 'Image'){
      setFileType('image');
      setMultiple(false);
     }else if(choosen === 'Gallery'){
      setFileType('image');
      setMultiple(true);
     }else if(choosen === 'Video'){
      setFileType('video');
      setMultiple(true);
     }
  }

  const handlePreview = (e) => {
     setGallery(e.target.files);
     console.log(e.target.files);
  }

  return (
    <div className="App">
       <div className='Images'>
          {
          Object.keys(gallery).map((keyName, i) => (
            <img src={URL.createObjectURL(gallery[keyName])} alt='' />
          ))
          }
       </div>
        <form onSubmit={handleSubmit} className="form">
           <select onChange={handleSelect}>
            <option value='Image'>Image</option>
            <option value='Gallery'>Gallery</option>
            <option value='Video'>Video</option>
           </select>
           {
            multiple ? (
              <input 
              type='file' 
              id="gallery"
              name="gallery"
              accept={`${fyleType}/*`}
              onChange={handlePreview}
              multiple
              />
            ):(
              <input 
              type='file' 
              id="gallery"
              name="gallery"
              accept={`${fyleType}/*`}
              onChange={handlePreview}
              />
            )
           }
           <input type='submit' value='Upload'/>
        </form>
    </div>
  );
}

export default App;
