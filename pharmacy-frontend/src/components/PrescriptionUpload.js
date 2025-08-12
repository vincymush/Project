import React, { useState } from "react";

export default function PrescriptionUpload() {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a prescription file");
    // Upload logic here
    alert("Prescription uploaded successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Upload Prescription:
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      </label>
      <button type="submit">Upload</button>
    </form>
  );
}
