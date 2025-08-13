import React, { useState, useEffect } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    phone: "",
  });

  // Simulate fetching profile from backend
  useEffect(() => {
    const fetchedProfile = {
      username: "adminUser",
      email: "admin@example.com",
      phone: "123-456-7890",
    };
    setProfile(fetchedProfile); // ✅ setProfile is used
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value })); // ✅ setProfile used
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Profile updated!\n\nUsername: ${profile.username}\nEmail: ${profile.email}\nPhone: ${profile.phone}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label htmlFor="username" className="block font-semibold mb-1">Username</label>
          <input
            id="username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-semibold mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block font-semibold mb-1">Phone</label>
          <input
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
