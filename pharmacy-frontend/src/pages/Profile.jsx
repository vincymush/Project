import React, { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    username: "adminUser",
    email: "admin@example.com",
    phone: "123-456-7890",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated! (In real app, save to backend)");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
