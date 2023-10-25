import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `516b4c370ef69ea8fc37`,
            pinata_secret_api_key: `ea2e197c4b067a7be38ac5d862cfe80d4970e54b8652103238890c0a4548dea8`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        await contract.add(account, ImgHash, fileName);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
    // console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="outer">
    <div className="top">
   
    <label htmlFor="file-upload" className="choose">
          Choose File
        </label>
        <span className="textArea">Image: {fileName}</span>
        <form className="form" onSubmit={handleSubmit}>
       
       <input
         disabled={!account}
         type="file"
         id="file-upload"
         name="data"
         onChange={retrieveFile}
       />
       
       <button type="submit" className="upload" disabled={!file}>
         Upload File
       </button>
     </form>
    </div>

   
    </div>
  );
};
export default FileUpload;
