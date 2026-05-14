"use client";

// import { useState } from "react";
import {
  FaBriefcase,
  FaEye,
  FaCalendarAlt,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const stats = [
  {
    name: "Total Applications",
    value: "24",
    change: "+12%",
    changeType: "increase",
    icon: FaBriefcase,
  },
  {
    name: "Profile Views",
    value: "156",
    change: "+8%",
    changeType: "increase",
    icon: FaEye,
  },
  {
    name: "Interview Invites",
    value: "5",
    change: "-2%",
    changeType: "decrease",
    icon: FaCalendarAlt,
  },
];

const recentApplications = [
  {
    id: 1,
    company: "Tech Corp",
    role: "Senior Frontend Developer",
    status: "In Review",
    date: "2024-03-15",
  },
  {
    id: 2,
    company: "Design Studio",
    role: "UI/UX Designer",
    status: "Interview Scheduled",
    date: "2024-03-14",
  },
  {
    id: 3,
    company: "StartupX",
    role: "Full Stack Developer",
    status: "Application Sent",
    date: "2024-03-13",
  },
];

const jobRecommendations = [
  {
    id: 1,
    company: "Innovation Labs",
    role: "React Developer",
    match: "95%",
    location: "Remote",
    salary: "$80k - $120k",
  },
  {
    id: 2,
    company: "Digital Agency",
    role: "Frontend Developer",
    match: "90%",
    location: "New York, NY",
    salary: "$75k - $110k",
  },
  {
    id: 3,
    company: "Tech Solutions",
    role: "UI Developer",
    match: "85%",
    location: "San Francisco, CA",
    salary: "$85k - $130k",
  },
];

export default function DashboardPage() {
  // const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, John Doe!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here{"'"}s what{"'"}s happening with your job search today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.changeType === "increase" ? (
                  <FaArrowUp className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
                ) : (
                  <FaArrowDown className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
                )}
                <span className="sr-only">
                  {stat.changeType === "increase" ? "Increased" : "Decreased"} by
                </span>
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Applications
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentApplications.map((application) => (
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
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        application.status === "Interview Scheduled"
                          ? "bg-green-100 text-green-800"
                          : application.status === "In Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {application.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(application.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Recommendations */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recommended Jobs
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {jobRecommendations.map((job) => (
              <li key={job.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                        <span className="text-white font-bold">
                          {job.company[0]}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {job.role}
                      </div>
                      <div className="text-sm text-gray-500">
                        {job.company} • {job.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{job.salary}</span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {job.match} Match
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