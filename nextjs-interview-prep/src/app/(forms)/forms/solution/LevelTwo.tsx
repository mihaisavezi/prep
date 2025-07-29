// components/forms/Level2ValidationForm.jsx
"use client";

import { useState, useEffect } from "react";

export default function Level2ValidationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmittable, setIsSubmittable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) newErrors.name = "Name is required";
        else delete newErrors.name;
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value))
          newErrors.email = "Invalid email format";
        else delete newErrors.email;
        break;
      case "password":
        if (value.length < 6)
          newErrors.password = "Password must be at least 6 characters";
        else delete newErrors.password;
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    setIsSubmittable(
      formData.name.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.password.trim() !== "" &&
        Object.keys(errors).length === 0
    );
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmittable) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm p-6">
        <h1 className="text-3xl font-bold">Level 2: Real-time Validation</h1>
      </header>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isSubmittable}
          className={`px-4 py-2 rounded ${
            isSubmittable
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </form>
    </>
  );
}
