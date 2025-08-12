import React, { useState } from "react";

export default function PrescriptionVerification() {
  const [file, setFile] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setVerificationResult(null); // reset previous result
  };

  const handleVerify = () => {
    if (!file) {
      alert("Please upload a prescription file first.");
      return;
    }

    setLoading(true);
    setVerificationResult(null);

    // Simulate an API call delay
    setTimeout(() => {
      // Simulate verification logic
      const isValid = Math.random() > 0.3; // 70% chance valid

      setVerificationResult(
        isValid
          ? "Prescription is verified and valid."
          : "Prescription verification failed or invalid."
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Prescription Verification</h2>

      <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />

      <button
        onClick={handleVerify}
        style={{ marginTop: 10 }}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify Prescription"}
      </button>

      {verificationResult && (
        <div
          style={{
            marginTop: 15,
            padding: 10,
            borderRadius: 5,
            backgroundColor:
              verificationResult.includes("valid") ? "#d4edda" : "#f8d7da",
            color: verificationResult.includes("valid") ? "#155724" : "#721c24",
          }}
        >
          {verificationResult}
        </div>
      )}
    </div>
  );
}
