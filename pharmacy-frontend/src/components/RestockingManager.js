import React, { useState } from "react";

export default function RestockingManager({ medicines, onRestock }) {
  const [selectedMedId, setSelectedMedId] = useState(
    medicines.length > 0 ? medicines[0].id : null
  );
  const [quantity, setQuantity] = useState("");

  const handleRestock = (e) => {
    e.preventDefault();
    const qtyNum = Number(quantity);
    if (qtyNum <= 0 || quantity === "") {
      alert("Enter a positive quantity");
      return;
    }
    onRestock(selectedMedId, qtyNum);
    setQuantity("");
  };

  return (
    <form
      onSubmit={handleRestock}
      className="mb-6 bg-white rounded shadow p-6 max-w-md"
    >
      <h3 className="text-xl font-semibold mb-4">Restock Medicines</h3>
      <div className="flex items-center space-x-3">
        <select
          value={selectedMedId}
          onChange={(e) => setSelectedMedId(Number(e.target.value))}
          className="flex-grow border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Select medicine"
        >
          {medicines.map((med) => (
            <option key={med.id} value={med.id}>
              {med.name} (Stock: {med.stock})
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Qty"
          className="w-20 border border-gray-300 rounded px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Quantity to add"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-base transition"
        >
          Restock
        </button>
      </div>
    </form>
  );
}
