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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = useMemo(
    () => [...new Set(trainingModules.map((m) => m.category))],
    []
  );

  const filteredModules = useMemo(() => {
    return trainingModules.filter((module) => {
      const matchesSearch = module.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || module.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Training Modules</h1>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search training modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
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
    </div>
  );
}
