import React, { useState } from "react";

export default function CustomerUploadPage({ onLogout }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a prescription file.");
      return;
    }

    setUploading(true);
    setMessage("");
    setProgress(0);

    // Simulate upload process
    const fakeUpload = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(fakeUpload);
          setUploading(false);
          setMessage(`Prescription "${file.name}" uploaded successfully.`);
          setFile(null);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Simple Back button handler
  const handleBack = () => {
    window.history.back();
  };

  // Simple Forward button handler
  const handleForward = () => {
    window.history.forward();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Upload Prescription
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={uploading}
          className={`${
            uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-semibold py-3 rounded-md transition`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {file && !uploading && (
        <p className="mt-6 text-center text-gray-700">
          Selected file: <span className="font-medium">{file.name}</span>
        </p>
      )}

      {uploading && (
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center mt-2 text-gray-600">{progress}%</p>
        </div>
      )}

      {message && (
        <p className="mt-6 text-center text-green-600 font-medium">{message}</p>
      )}

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
          type="button"
        >
          &#8592; Back
        </button>
        <button
          onClick={handleForward}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded"
          type="button"
        >
          Forward &#8594;
        </button>
      </div>

      {/* Logout Button */}
      <div className="mt-6 text-center">
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
