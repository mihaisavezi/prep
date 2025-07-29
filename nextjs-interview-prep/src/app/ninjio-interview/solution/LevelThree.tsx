// pages/phishing-results.js
import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  TrendingDown,
  Filter,
} from "lucide-react";

// Simulated real-time data
const generateSimulationData = () => [
  {
    id: 1,
    email: "john@company.com",
    department: "Engineering",
    clicked: true,
    reportedPhishing: false,
    timeToClick: 45,
    timestamp: "2024-01-20T10:30:00Z",
  },
  {
    id: 2,
    email: "sarah@company.com",
    department: "Marketing",
    clicked: false,
    reportedPhishing: true,
    timeToClick: null,
    timestamp: "2024-01-20T10:32:00Z",
  },
  {
    id: 3,
    email: "mike@company.com",
    department: "Sales",
    clicked: true,
    reportedPhishing: false,
    timeToClick: 120,
    timestamp: "2024-01-20T10:35:00Z",
  },
  {
    id: 4,
    email: "lisa@company.com",
    department: "HR",
    clicked: false,
    reportedPhishing: false,
    timeToClick: null,
    timestamp: "2024-01-20T10:38:00Z",
  },
  {
    id: 5,
    email: "david@company.com",
    department: "Engineering",
    clicked: false,
    reportedPhishing: true,
    timeToClick: null,
    timestamp: "2024-01-20T10:40:00Z",
  },
];

const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "blue",
}) => (
  <div className="bg-white rounded-lg border p-6">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Icon className={`h-5 w-5 text-${color}-600`} />
        <span className="text-sm font-medium text-gray-600">{title}</span>
      </div>
      {trend && (
        <span
          className={`text-xs px-2 py-1 rounded ${
            trend > 0
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {trend > 0 ? "+" : ""}
          {trend}%
        </span>
      )}
    </div>
    <p className={`text-2xl font-bold text-${color}-600 mb-1`}>{value}</p>
    {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
  </div>
);

const ResultRow = ({ result, onViewDetails }) => {
  const statusColor = result.clicked
    ? "red"
    : result.reportedPhishing
    ? "green"
    : "gray";
  const statusText = result.clicked
    ? "Clicked"
    : result.reportedPhishing
    ? "Reported"
    : "No Action";

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{result.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">{result.department}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusColor === "red"
              ? "bg-red-100 text-red-800"
              : statusColor === "green"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {statusText}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {result.timeToClick ? `${result.timeToClick}s` : "-"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(result.timestamp).toLocaleTimeString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onViewDetails(result.id)}
          className="text-blue-600 hover:text-blue-900"
        >
          View Details
        </button>
      </td>
    </tr>
  );
};

export default function PhishingResults() {
  const [results, setResults] = useState(generateSimulationData());
  const [filter, setFilter] = useState("all"); // all, clicked, reported, no-action
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isLive, setIsLive] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setResults((prev) => {
        const newResult = {
          id: prev.length + 1,
          email: `user${prev.length + 1}@company.com`,
          department: ["Engineering", "Marketing", "Sales", "HR"][
            Math.floor(Math.random() * 4)
          ],
          clicked: Math.random() > 0.7,
          reportedPhishing: Math.random() > 0.8,
          timeToClick:
            Math.random() > 0.7 ? Math.floor(Math.random() * 300) : null,
          timestamp: new Date().toISOString(),
        };
        return [newResult, ...prev].slice(0, 20); // Keep only latest 20
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  const departments = useMemo(
    () => [...new Set(results.map((r) => r.department))],
    [results]
  );

  const filteredAndSortedResults = useMemo(() => {
    let filtered = results;

    // Apply status filter
    if (filter === "clicked") {
      filtered = filtered.filter((r) => r.clicked);
    } else if (filter === "reported") {
      filtered = filtered.filter((r) => r.reportedPhishing);
    } else if (filter === "no-action") {
      filtered = filtered.filter((r) => !r.clicked && !r.reportedPhishing);
    }

    // Apply department filter
    if (departmentFilter) {
      filtered = filtered.filter((r) => r.department === departmentFilter);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];

      if (sortBy === "timestamp") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [results, filter, departmentFilter, sortBy, sortOrder]);

  const metrics = useMemo(() => {
    const total = results.length;
    const clicked = results.filter((r) => r.clicked).length;
    const reported = results.filter((r) => r.reportedPhishing).length;
    const avgTimeToClick =
      results
        .filter((r) => r.timeToClick)
        .reduce((sum, r) => sum + r.timeToClick, 0) /
        results.filter((r) => r.timeToClick).length || 0;

    return {
      total,
      clickRate: total > 0 ? Math.round((clicked / total) * 100) : 0,
      reportRate: total > 0 ? Math.round((reported / total) * 100) : 0,
      avgTimeToClick: Math.round(avgTimeToClick),
    };
  }, [results]);

  const handleViewDetails = useCallback((resultId) => {
    console.log(`Viewing details for result ${resultId}`);
    // In real app: open modal or navigate to detail page
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Phishing Simulation Results
          </h1>
          <p className="text-gray-600">
            Real-time monitoring of ongoing simulation
          </p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`px-4 py-2 rounded-lg font-medium ${
            isLive ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          {isLive ? "Live" : "Paused"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Participants"
          value={metrics.total}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Click Rate"
          value={`${metrics.clickRate}%`}
          subtitle="clicked phishing link"
          icon={AlertTriangle}
          trend={2}
          color="red"
        />
        <MetricCard
          title="Report Rate"
          value={`${metrics.reportRate}%`}
          subtitle="reported as phishing"
          icon={CheckCircle}
          trend={-5}
          color="green"
        />
        <MetricCard
          title="Avg Time to Click"
          value={`${metrics.avgTimeToClick}s`}
          icon={Clock}
          color="orange"
        />
      </div>

      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Detailed Results</h2>
            <div className="flex items-center gap-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="all">All Results</option>
                <option value="clicked">Clicked Link</option>
                <option value="reported">Reported Phishing</option>
                <option value="no-action">No Action</option>
              </select>

              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="timestamp-desc">Latest First</option>
                <option value="timestamp-asc">Oldest First</option>
                <option value="email-asc">Email A-Z</option>
                <option value="timeToClick-asc">Fastest Click</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time to Click
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedResults.map((result) => (
                <ResultRow
                  key={result.id}
                  result={result}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
