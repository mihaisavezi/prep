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
        // TODO: Add validation - name should not be empty
        // COMPLETE THIS
        if (value === "") newErrors[name] = "name should not be empty";
        else {
          delete newErrors[name];
        }
        
        break;
      case "email":
        // TODO: Add email validation using regex
        // COMPLETE THIS - use /^\S+@\S+\.\S+$/ pattern
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          newErrors[name] = "please fill in a valid email";
        } else {
          delete newErrors[name];
        }
        break;
      case "password":
        // TODO: Add password validation - minimum 6 characters
        // COMPLETE THIS
        if (value.length < 6)
          newErrors[name] = "password should be minimum 6 characters";
        else {
          delete newErrors[name];
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  useEffect(() => {
    // TODO: Set isSubmittable to true only if:
    // - All fields have values
    // - No errors exist
    // COMPLETE THIS

    const isSubmittable =
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      Object.keys(errors).length === 0;
      setIsSubmittable(isSubmittable);
    // YOUR LOGIC HERE
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmittable) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Level 2: Validation Form</h2>

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
        {/* TODO: Show error message if errors.name exists */}
        <p className="text-red-500">{errors.name && errors.name}</p>
      </div>

      {/* TODO: Complete email and password fields with error display */}
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
        <p className="text-red-500">{errors.email && errors.email}</p>
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
        {/* TODO: Show error message if errors.name exists */}
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
  );
}
