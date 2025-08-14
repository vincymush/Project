// src/pages/ExpiredMedicinesPage.jsx
import React, { useState, useMemo } from "react";
import ExpiredMedicines from "./ExpiredMedicines";

export default function ExpiredMedicinesPage() {
  // Mock medicine data
  const [medicines, setMedicines] = useState([
    { name: "Paracetamol", barcode: "123456", price: 50, expiryDate: "2024-12-01" },
    { name: "Ibuprofen", barcode: "234567", price: 70, expiryDate: "2025-06-01" },
    { name: "Amoxicillin", barcode: "345678", price: 120, expiryDate: "2023-09-10" },
    { name: "Vitamin C", barcode: "456789", price: 30, expiryDate: "2025-08-10" },
  ]);

  const today = new Date();

  // Automatically filter expired medicines
  const expiredMedicines = useMemo(() => {
    return medicines.filter(med => new Date(med.expiryDate) < today);
  }, [medicines]);

  // Handle deleting a medicine
  const handleDelete = (medicine) => {
    console.log("Deleted:", medicine);
    setMedicines(medicines.filter((med) => med.barcode !== medicine.barcode));
  };

  // Handle marking a medicine as checked
  const handleMarkChecked = (medicine) => {
    console.log("Marked as checked:", medicine);
    alert(`${medicine.name} marked as checked ✅`);
  };

  return (
    <ExpiredMedicines
      medicines={expiredMedicines}
      onDelete={handleDelete}
      onMarkChecked={handleMarkChecked}
    />
  );
}
