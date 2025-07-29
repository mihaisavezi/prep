// components/forms/Level4ComplexForm.jsx
"use client";

import { useState } from "react";

export default function Level4ComplexForm() {
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      dob: "",
    },
    address: {
      street: "",
      city: "",
      zip: "",
    },
    preferences: {
      newsletter: false,
      notifications: true,
      theme: "light",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.split(".");

    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User profile submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-bold">Level 4: Complex State</h2>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Personal Information</legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">First Name:</label>
            <input
              type="text"
              name="personal.firstName"
              value={formData.personal.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Last Name:</label>
            <input
              type="text"
              name="personal.lastName"
              value={formData.personal.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Date of Birth:</label>
            <input
              type="date"
              name="personal.dob"
              value={formData.personal.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Address</legend>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Street:</label>
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">City:</label>
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-1">ZIP Code:</label>
              <input
                type="text"
                name="address.zip"
                value={formData.address.zip}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
      </fieldset>

      <fieldset className="border p-4 rounded">
        <legend className="font-semibold">Preferences</legend>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="preferences.newsletter"
              checked={formData.preferences.newsletter}
              onChange={handleChange}
              className="mr-2"
            />
            Subscribe to newsletter
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              name="preferences.notifications"
              checked={formData.preferences.notifications}
              onChange={handleChange}
              className="mr-2"
            />
            Enable notifications
          </label>

          <div>
            <label className="block mb-1">Theme:</label>
            <div className="flex space-x-4">
              {["light", "dark", "system"].map((theme) => (
                <label key={theme} className="flex items-center">
                  <input
                    type="radio"
                    name="preferences.theme"
                    value={theme}
                    checked={formData.preferences.theme === theme}
                    onChange={handleChange}
                    className="mr-1"
                  />
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Profile
      </button>
    </form>
  );
}
