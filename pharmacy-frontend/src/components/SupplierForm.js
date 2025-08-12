import React, { useState } from "react";

export default function SupplierForm({ onAddSupplier }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return alert("Supplier name is required");
    onAddSupplier({ name, contact });
    setName("");
    setContact("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Supplier Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Contact Info"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <button type="submit">Add Supplier</button>
    </form>
  );
}
