import React from "react";
/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */

const ImageThumb = ({ image }) => {
  return <div>
    <img src={URL.createObjectURL(image)} alt={image.name} />
    </div>;
};

 function FileUpload() {
  // State to store uploaded file
  const [file, setFile] = React.useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }

  return (
    <div id="upload-box">
      <input type="file" onChange={handleUpload} />
      <p className="m-5">
        {file && <ImageThumb image={file} />}
      </p>
    </div>
  );
}
export default FileUpload;
