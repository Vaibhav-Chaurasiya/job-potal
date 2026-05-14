"use client";

import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaSort,
  FaCalendarAlt,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";

const applications = [
  {
    id: 1,
    company: "Tech Corp",
    role: "Senior Frontend Developer",
    status: "In Review",
    date: "2024-03-15",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    type: "Full-time",
  },
  {
    id: 2,
    company: "Design Studio",
    role: "UI/UX Designer",
    status: "Interview Scheduled",
    date: "2024-03-14",
    location: "Remote",
    salary: "$90k - $130k",
    type: "Full-time",
  },
  {
    id: 3,
    company: "StartupX",
    role: "Full Stack Developer",
    status: "Application Sent",
    date: "2024-03-13",
    location: "New York, NY",
    salary: "$100k - $150k",
    type: "Full-time",
  },
  {
    id: 4,
    company: "Digital Agency",
    role: "Frontend Developer",
    status: "Rejected",
    date: "2024-03-12",
    location: "Los Angeles, CA",
    salary: "$80k - $120k",
    type: "Contract",
  },
  {
    id: 5,
    company: "Tech Solutions",
    role: "UI Developer",
    status: "Offer Received",
    date: "2024-03-11",
    location: "Remote",
    salary: "$95k - $140k",
    type: "Full-time",
  },
];

const statusColors = {
  "In Review": "bg-yellow-100 text-yellow-800",
  "Interview Scheduled": "bg-green-100 text-green-800",
  "Application Sent": "bg-blue-100 text-blue-800",
  "Rejected": "bg-red-100 text-red-800",
  "Offer Received": "bg-purple-100 text-purple-800",
};

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || app.status === statusFilter;
    const matchesType = typeFilter === "all" || app.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track and manage all your job applications in one place.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Search */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaFilter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="In Review">In Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Application Sent">Application Sent</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer Received">Offer Received</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSort className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            All Applications
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <li key={application.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                        <span className="text-white font-bold">
                          {application.company[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {application.role}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.company}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaBuilding className="mr-1 h-4 w-4" />
                      {application.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaBriefcase className="mr-1 h-4 w-4" />
                      {application.type}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-1 h-4 w-4" />
                      {new Date(application.date).toLocaleDateString()}
                    </div>
                    <span className="text-sm text-gray-500">
                      {application.salary}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusColors[application.status as keyof typeof statusColors]
                      }`}
                    >
                      {application.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 