// pages/dashboard.js
import React, { useState, useMemo } from "react";
import { Play, CheckCircle, Clock, TrendingUp } from "lucide-react";

const userData = {
  name: "John Doe",
  completedModules: 12,
  totalModules: 20,
  currentStreak: 5,
  weeklyGoal: 3,
};

const moduleProgress = [
  {
    id: 1,
    title: "Phishing Email Detection",
    completed: true,
    score: 95,
    timeSpent: 5,
    completedAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Password Security",
    completed: true,
    score: 88,
    timeSpent: 8,
    completedAt: "2024-01-16",
  },
  {
    id: 3,
    title: "Social Engineering",
    completed: false,
    score: null,
    timeSpent: 3,
    completedAt: null,
  },
  {
    id: 4,
    title: "USB Security Threats",
    completed: true,
    score: 92,
    timeSpent: 6,
    completedAt: "2024-01-17",
  },
  {
    id: 5,
    title: "Multi-Factor Authentication",
    completed: false,
    score: null,
    timeSpent: 0,
    completedAt: null,
  },
];

const ProgressCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "blue",
}) => (
  // TODO: Implement progress card component
  <div></div>
);

const ModuleRow = ({ module, onStart }) => (
  // TODO: Implement module row with conditional rendering for completed/pending states
  <div></div>
);

export default function Dashboard() {
  // TODO: Add state for filter and sortBy

  // TODO: Implement filteredAndSortedModules with useMemo
  // Filter logic: all, completed, pending
  // Sort logic: title, score, timeSpent

  // TODO: Calculate completion rate using useMemo

  // TODO: Calculate average score using useMemo

  const handleStartModule = (moduleId) => {
    console.log(`Starting module ${moduleId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* TODO: Implement dashboard layout with progress cards and module list */}
    </div>
  );
}
