import React, { useState } from "react";

export default function Billing() {
  const [cart, setCart] = useState([]);
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const addItem = () => {
    if (!medicineName || !price || quantity <= 0) {
      alert("Please enter valid medicine, price, and quantity.");
      return;
    }

    const newItem = {
      name: medicineName,
      quantity,
      price: parseFloat(price),
      total: parseFloat(price) * quantity,
    };

    setCart([...cart, newItem]);
    setMedicineName("");
    setQuantity(1);
    setPrice("");
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);

  const handlePayment = () => {
    if (!amountPaid) {
      alert("Enter amount paid.");
      return;
    }
    const change = parseFloat(amountPaid) - totalAmount;
    if (change < 0) {
      alert("Amount paid is less than total.");
      return;
    }
    alert(`Payment successful! Change: KSh ${change.toFixed(2)}`);
    setCart([]);
    setAmountPaid("");
  };

  return (
    <div>
      <h1>Billing</h1>
      <div>
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="Price per unit"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={addItem}>Add to Bill</button>
      </div>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Qty</th>
            <th>Price (KSh)</th>
            <th>Total (KSh)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.total.toFixed(2)}</td>
              <td>
                <button onClick={() => removeItem(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: KSh {totalAmount.toFixed(2)}</h3>

      {cart.length > 0 && (
        <>
          <input
            type="number"
            placeholder="Amount Paid"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
          <button onClick={handlePayment}>Complete Payment</button>
        </>
      )}
    </div>
  );
}
