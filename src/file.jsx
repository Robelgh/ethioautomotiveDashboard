import React from 'react'
import { useState } from 'react';
import axios from 'axios';
 
function FileUpload (){
 
      const [file, setFile] = useState();
      const [fileName, setFileName] = useState("");
      const [imageName,setImageName] = useState("");
      var imgg="painting.jpg";
 
      const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };
 
      const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
          const res = await axios.post(
            "http://localhost:3000/upload",
            formData
          );
          setImageName(res.data.message.imageName)
          console.log(res);
        } catch (ex) {
          console.log(ex);
        }
      };
 
    
      return (
        <div className="App">
          <input type="file" onChange={saveFile} />
          <button onClick={uploadFile}>Upload</button>

          <img src={`http://localhost:3000/${imgg}`} className="img-fluid" />
        </div>
      );
    
}
 
export default FileUpload;