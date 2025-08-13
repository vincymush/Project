import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Simple validation
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      // Create user in Firebase Auth
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      // Store user data in Firestore
      await setDoc(doc(db, "users", userCred.user.uid), {
        email,
        role,
        createdAt: new Date().toISOString(),
      });

      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.message || "Something went wrong during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br/><br/>

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="cashier">Cashier</option>
          <option value="customer">Customer</option>
        </select><br/><br/>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
