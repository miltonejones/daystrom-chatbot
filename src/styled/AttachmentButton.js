import React from "react";
import IconButton from "@mui/material/IconButton";
import AttachmentIcon from "@mui/icons-material/Attachment";

function AttachmentButton({ fileLoaded, ...props }) {
  const fileInputRef = React.useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 3072) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fileLoaded({
          name: file.name,
          size: file.size,
          text: e.target.result,
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".txt, .json, .js, .py" // Updated this line
        onChange={handleFileChange}
      />

      <IconButton {...props} onClick={() => fileInputRef.current.click()}>
        <AttachmentIcon />
      </IconButton>
    </>
  );
}

export default AttachmentButton;
