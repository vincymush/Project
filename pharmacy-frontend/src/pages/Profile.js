import React, { useState } from "react";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+123456789",
  });

  return (
    <div>
      <h1>Cashier Profile</h1>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <p>
        <strong>Phone:</strong> {profile.phone}
      </p>
    </div>
  );
}
