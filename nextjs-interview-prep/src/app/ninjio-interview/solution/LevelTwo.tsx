// pages/dashboard.js
import React, { useState, useMemo, useEffect } from "react";
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
  <div className="bg-white rounded-lg border p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold text-${color}-600`}>{value}</p>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>
      <Icon className={`h-8 w-8 text-${color}-600`} />
    </div>
  </div>
);

const ModuleRow = ({ module, onStart }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex items-center gap-3">
      {module.completed ? (
        <CheckCircle className="h-5 w-5 text-green-600" />
      ) : (
        <div className="h-5 w-5 border-2 border-gray-300 rounded-full" />
      )}
      <div>
        <h3 className="font-medium">{module.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {module.timeSpent}min
          </span>
          {module.completed && (
            <span className="text-green-600 font-medium">
              Score: {module.score}%
            </span>
          )}
        </div>
      </div>
    </div>
    {!module.completed && (
      <button
        onClick={() => onStart(module.id)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Play size={16} />
        Start
      </button>
    )}
  </div>
);

export default function Dashboard() {
  const [filter, setFilter] = useState("all"); // all, completed, pending
  const [sortBy, setSortBy] = useState("title"); // title, score, timeSpent

  const filteredAndSortedModules = useMemo(() => {
    let filtered = moduleProgress;

    if (filter === "completed") {
      filtered = moduleProgress.filter((m) => m.completed);
    } else if (filter === "pending") {
      filtered = moduleProgress.filter((m) => !m.completed);
    }

    return filtered.sort((a, b) => {
      if (sortBy === "score") {
        return (b.score || 0) - (a.score || 0);
      } else if (sortBy === "timeSpent") {
        return b.timeSpent - a.timeSpent;
      }
      return a.title.localeCompare(b.title);
    });
  }, [filter, sortBy]);

  const completionRate = useMemo(
    () => Math.round((userData.completedModules / userData.totalModules) * 100),
    []
  );

  const averageScore = useMemo(() => {
    const completedWithScores = moduleProgress.filter(
      (m) => m.completed && m.score
    );
    return completedWithScores.length > 0
      ? Math.round(
          completedWithScores.reduce((sum, m) => sum + m.score, 0) /
            completedWithScores.length
        )
      : 0;
  }, []);

  const handleStartModule = (moduleId) => {
    console.log(`Starting module ${moduleId}`);
    // In real app: navigate to training module
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {userData.name}!
        </h1>
        <p className="text-gray-600">
          Continue your cybersecurity training journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <ProgressCard
          title="Completion Rate"
          value={`${completionRate}%`}
          subtitle={`${userData.completedModules}/${userData.totalModules} modules`}
          icon={TrendingUp}
          color="green"
        />
        <ProgressCard
          title="Average Score"
          value={`${averageScore}%`}
          icon={CheckCircle}
          color="blue"
        />
        <ProgressCard
          title="Current Streak"
          value={`${userData.currentStreak} days`}
          icon={Clock}
          color="orange"
        />
        <ProgressCard
          title="Weekly Goal"
          value={`${userData.weeklyGoal}/3`}
          subtitle="modules completed"
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Training Modules</h2>
            <div className="flex gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="all">All Modules</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="title">Sort by Title</option>
                <option value="score">Sort by Score</option>
                <option value="timeSpent">Sort by Time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {filteredAndSortedModules.map((module) => (
              <ModuleRow
                key={module.id}
                module={module}
                onStart={handleStartModule}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
