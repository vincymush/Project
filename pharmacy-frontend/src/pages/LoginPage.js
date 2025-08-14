// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser, setRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, "users", userCred.user.uid));
      if (!userDoc.exists()) {
        alert("User record not found in Firestore.");
        setLoading(false);
        return;
      }

      const { role } = userDoc.data();
      setUser(userCred.user);
      setRole(role);

      if (role) navigate(`/${role}`);
      else alert("No role assigned to this account.");
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/user-not-found") alert("No account found with this email.");
      else if (error.code === "auth/wrong-password") alert("Incorrect password.");
      else alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Stylish Title */}
        <h1 style={styles.title}>Pharmacy Management System Web Application</h1>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
    width: "100%",
    maxWidth: "450px",
    textAlign: "center",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#333",
    marginBottom: "25px",
    lineHeight: "1.2",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    transition: "0.3s",
  },
  button: {
    padding: "14px",
    background: "linear-gradient(90deg, #6a11cb, #2575fc)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "0.3s",
  },
};
