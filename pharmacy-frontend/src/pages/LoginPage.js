// src/pages/LoginPage.jsx
import React, { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context to store current user role
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [role, setRole] = useState(null); // null, 'admin', 'pharmacist', 'cashier', 'customer'

  const login = (userRole) => setRole(userRole);
  const logout = () => setRole(null);

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Improved Login Component with validation, accessibility, and redirect
export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.role) newErrors.role = "Please select a role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (["admin", "pharmacist", "cashier", "customer"].includes(formData.role)) {
        login(formData.role);

        // Redirect to dashboard after login
        switch (formData.role) {
          case "admin":
            navigate("/admin", { replace: true });
            break;
          case "pharmacist":
            navigate("/pharmacist", { replace: true });
            break;
          case "cashier":
            navigate("/cashier", { replace: true });
            break;
          case "customer":
            navigate("/customer", { replace: true });
            break;
          default:
            navigate("/login");
        }
      } else {
        alert("Select a valid role to login");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              aria-describedby="username-error"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p id="username-error" className="mt-1 text-red-600 text-sm">
                {errors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                aria-describedby="password-error"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-blue-600 hover:text-blue-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-1 text-red-600 text-sm">
                {errors.password}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block mb-1 font-medium">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              aria-describedby="role-error"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.role ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="cashier">Cashier</option>
              <option value="customer">Customer</option>
            </select>
            {errors.role && (
              <p id="role-error" className="mt-1 text-red-600 text-sm">
                {errors.role}
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => alert("Forgot password clicked!")}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={!formData.username || !formData.password || !formData.role}
            className={`w-full py-2 rounded-lg text-white transition ${
              formData.username && formData.password && formData.role
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// Default export
export default Login;
