"use client"
import React, { useState, useMemo } from "react";
import { Search, Clock, Shield } from "lucide-react";

const trainingModules = [
  {
    id: 1,
    title: "Phishing Email Detection",
    duration: 5,
    category: "Email Security",
    difficulty: "Beginner",
  },
  {
    id: 2,
    title: "Password Security Best Practices",
    duration: 8,
    category: "Authentication",
    difficulty: "Intermediate",
  },
  {
    id: 3,
    title: "Social Engineering Awareness",
    duration: 12,
    category: "Human Factors",
    difficulty: "Advanced",
  },
  {
    id: 4,
    title: "USB Security Threats",
    duration: 6,
    category: "Physical Security",
    difficulty: "Beginner",
  },
  {
    id: 5,
    title: "Multi-Factor Authentication",
    duration: 10,
    category: "Authentication",
    difficulty: "Intermediate",
  },
];

const ModuleCard = ({ module }) => (
  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-2">
      <h3 className="font-semibold text-lg">{module.title}</h3>
      <span
        className={`px-2 py-1 rounded text-xs ${
          module.difficulty === "Beginner"
            ? "bg-green-100 text-green-800"
            : module.difficulty === "Intermediate"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {module.difficulty}
      </span>
    </div>
    <div className="flex items-center gap-4 text-sm text-gray-600">
      <div className="flex items-center gap-1">
        <Clock size={16} />
        {module.duration} min
      </div>
      <div className="flex items-center gap-1">
        <Shield size={16} />
        {module.category}
      </div>
    </div>
  </div>
);

export default function TrainingModules() {
  // TODO: Add state for search term and selected category
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // TODO: Create categories array using useMemo
  const categories = useMemo(() => {
    return [...new Set(trainingModules.map((module) => module.category))];
  }, [])

  // TODO: Implement filtering logic with 
  const filteredModules = useMemo(() => {
    return trainingModules.filter((module) => {
      const matchesSearch = searchTerm.toLowerCase() !== "" ? module.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const isFromSelectedCategory = selectedCategory !== ""  ? module.category === selectedCategory : true;

      return matchesSearch && isFromSelectedCategory
  })}, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Training Modules</h1>

      {/* TODO: Add search input and category filter */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        name="search"
        placeholder="Search training modules..."
        id="test"
      />
      <select
        name="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        id=""
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={`category-${index}`} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="gap-2 flex flex-col">
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No modules found matching your criteria.
          </p>
        )}
      </div>
      {/* TODO: Render filtered modules or no results message */}
    </div>
  );
}
