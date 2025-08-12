import React, { useState, useEffect } from "react";

export default function AddSupplierForm({ onAddSupplier }) {
  const [supplierName, setSupplierName] = useState("");
  const [supplierContact, setSupplierContact] = useState("");
  const [supplierEmail, setSupplierEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear success message after 4 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Clear error message on input change
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const trimmedName = supplierName.trim();
    const trimmedContact = supplierContact.trim();
    const trimmedEmail = supplierEmail.trim();

    // Validation
    if (!trimmedName || !trimmedContact || !trimmedEmail) {
      setError("Please fill in all fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // Simulate async operation (e.g. API call)
    setTimeout(() => {
      onAddSupplier({
        name: trimmedName,
        contact: trimmedContact,
        email: trimmedEmail,
      });

      setSuccess(`Supplier "${trimmedName}" added successfully!`);
      setSupplierName("");
      setSupplierContact("");
      setSupplierEmail("");
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="max-w-md bg-white rounded shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Add Supplier</h2>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label htmlFor="supplierName" className="block mb-1 font-medium">
            Supplier Name
          </label>
          <input
            id="supplierName"
            type="text"
            value={supplierName}
            onChange={handleInputChange(setSupplierName)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter supplier name"
            required
            aria-describedby="supplierNameError"
          />
        </div>

        <div>
          <label htmlFor="supplierContact" className="block mb-1 font-medium">
            Supplier Contact
          </label>
          <input
            id="supplierContact"
            type="text"
            value={supplierContact}
            onChange={handleInputChange(setSupplierContact)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter supplier contact"
            required
            aria-describedby="supplierContactError"
          />
        </div>

        <div>
          <label htmlFor="supplierEmail" className="block mb-1 font-medium">
            Supplier Email
          </label>
          <input
            id="supplierEmail"
            type="email"
            value={supplierEmail}
            onChange={handleInputChange(setSupplierEmail)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter supplier email"
            required
            aria-describedby="supplierEmailError"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-5 py-2 rounded-md text-white transition ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Supplier"}
        </button>
      </form>

      {error && (
        <p
          id="formError"
          className="mt-4 text-red-600 font-semibold"
          role="alert"
        >
          {error}
        </p>
      )}
      {success && !error && (
        <p
          id="formSuccess"
          className="mt-4 text-green-600 font-semibold"
          role="alert"
        >
          {success}
        </p>
      )}
    </div>
  );
}
