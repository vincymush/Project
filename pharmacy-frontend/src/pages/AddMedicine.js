// src/pages/AddMedicine.jsx
import React, { useState, useEffect } from "react";
import { rtdb } from "../firebase/config";
import { ref, set, onValue, remove, update } from "firebase/database";

export default function AddMedicine() {
  const [form, setForm] = useState({
    name: "",
    barcode: "",
    price: "",
    quantity: "",
    expiryDate: ""
  });
  const [medicines, setMedicines] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showExpiring, setShowExpiring] = useState(false);

  // Load medicines in real-time
  useEffect(() => {
    const medicinesRef = ref(rtdb, "medicines");
    const unsubscribe = onValue(medicinesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMedicines(
          Object.keys(data).map((key) => ({
            id: key,
            ...data[key]
          }))
        );
      } else {
        setMedicines([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Add or update medicine
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.barcode || !form.price || !form.quantity || !form.expiryDate) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      await update(ref(rtdb, `medicines/${editId}`), form);
      setEditId(null);
    } else {
      const entryKey = Date.now().toString();
      await set(ref(rtdb, `medicines/${entryKey}`), {
        ...form,
        id: entryKey
      });
    }

    setForm({ name: "", barcode: "", price: "", quantity: "", expiryDate: "" });
  };

  // Delete medicine
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      await remove(ref(rtdb, `medicines/${id}`));
    }
  };

  // Edit medicine
  const handleEdit = (medicine) => {
    setForm({
      name: medicine.name,
      barcode: medicine.barcode,
      price: medicine.price,
      quantity: medicine.quantity,
      expiryDate: medicine.expiryDate
    });
    setEditId(medicine.id);
  };

  // Check expiring soon
  const toggleExpiring = () => {
    setShowExpiring((prev) => !prev);
  };

  // Filter if showing expiring soon (within 30 days)
  const displayedMedicines = showExpiring
    ? medicines.filter((med) => {
        const today = new Date();
        const expDate = new Date(med.expiryDate);
        const diffDays = (expDate - today) / (1000 * 60 * 60 * 24);
        return diffDays <= 30 && diffDays >= 0;
      })
    : medicines;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Manage Medicines</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Medicine Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="barcode"
          placeholder="Barcode"
          value={form.barcode}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          {editId ? "Update Medicine" : "Add Medicine"}
        </button>
      </form>

      {/* Expiry Check Button */}
      <button onClick={toggleExpiring} style={styles.expiryButton}>
        {showExpiring ? "Show All Medicines" : "Check Expiring Soon"}
      </button>

      {/* Medicine List */}
      <h2 style={styles.subtitle}>Medicine List</h2>
      <ul style={styles.list}>
        {displayedMedicines.map((med) => {
          const isExpiringSoon =
            (new Date(med.expiryDate) - new Date()) / (1000 * 60 * 60 * 24) <= 30;

          return (
            <li
              key={med.id}
              style={{
                ...styles.listItem,
                backgroundColor: isExpiringSoon ? "#fff3cd" : "#f8f9fa"
              }}
            >
              <span>
                <strong>{med.name}</strong> — {med.barcode} — ${med.price} — Qty:{" "}
                {med.quantity} — Exp: {med.expiryDate}
              </span>
              <div>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(med)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(med.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif"
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    marginBottom: "20px"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "20px"
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  addButton: {
    gridColumn: "span 2",
    padding: "10px",
    backgroundColor: "#27ae60",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  expiryButton: {
    padding: "10px",
    backgroundColor: "#e67e22",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px"
  },
  subtitle: {
    marginBottom: "10px",
    color: "#34495e"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  listItem: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#2980b9",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px"
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#c0392b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};
