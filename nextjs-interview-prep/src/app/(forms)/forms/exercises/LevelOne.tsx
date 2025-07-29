// components/forms/Level1BasicForm.jsx
"use client";

import { useState } from "react";

export default function Level1BasicForm() {
  // TODO: Initialize state with name, email, password
  const [formData, setFormData] = useState({
    // COMPLETE THIS
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    // TODO: Update formData with the new value
    // COMPLETE THIS - use spread operator and computed property names
    setFormData((formData) => ({...formData, [e.target.name]: e.target.value}))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Level 1: Basic Form</h2>

      <div>
        <label className="block mb-1">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
