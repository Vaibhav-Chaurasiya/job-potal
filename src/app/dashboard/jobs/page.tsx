"use client";
import { useState } from "react";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaClock,
  FaListUl,
  FaGift,
  FaPaperPlane,
  FaArrowLeft,
} from "react-icons/fa";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

// Sample job data - would come from API in real app
const jobsData: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    salary: "₹8-12 LPA",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "We're looking for a skilled Frontend Developer to join our team. This role involves creating responsive web applications using React, Next.js, and modern CSS frameworks.",
    requirements: [
      "3+ years experience with React",
      "Strong knowledge of JavaScript/TypeScript",
      "Experience with responsive design",
      "Understanding of state management (Redux, Context API)",
    ],
    benefits: [
      "Flexible working hours",
      "Health insurance",
      "Learning budget",
      "Remote work options",
    ],
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "CodeBase",
    location: "New York",
    salary: "₹12-15 LPA",
    type: "Full-time",
    posted: "5 days ago",
    description:
      "CodeBase is seeking a Backend Developer to build robust APIs and services. You'll work with Node.js, Express, and MongoDB to create scalable solutions.",
    requirements: [
      "4+ years experience with Node.js",
      "Experience with NoSQL databases",
      "Understanding of RESTful API design",
      "Knowledge of authentication methods",
    ],
    benefits: [
      "Competitive salary",
      "401k matching",
      "Unlimited PTO",
      "Company retreats",
    ],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Designify",
    location: "San Francisco",
    salary: "₹10-14 LPA",
    type: "Contract",
    posted: "1 week ago",
    description:
      "Join our design team to create beautiful, intuitive user interfaces. You'll work closely with product managers and developers to design engaging experiences.",
    requirements: [
      "Portfolio showing UI/UX projects",
      "Proficiency in Figma or similar tools",
      "Understanding of user-centered design principles",
      "Experience with design systems",
    ],
    benefits: [
      "Creative work environment",
      "Latest design tools provided",
      "Flexible schedule",
      "Professional development opportunities",
    ],
  },
];

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
    window.scrollTo(0, 0);
  };

  const backToList = () => {
    setSelectedJob(null);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {selectedJob ? (
        // Job Details View in Settings-style
        <>
          {/* Header */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={backToList}
                className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaArrowLeft className="h-4 w-4 mr-2" />
                Back to jobs
              </button>
            </div>
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedJob.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500">
                <span className="flex items-center">
                  <FaBuilding className="h-4 w-4 mr-1 text-gray-400" />
                  {selectedJob.company}
                </span>
                <span className="flex items-center">
                  <FaMapMarkerAlt className="h-4 w-4 mr-1 text-gray-400" />
                  {selectedJob.location}
                </span>
                <span className="flex items-center">
                  <FaDollarSign className="h-4 w-4 mr-1 text-gray-400" />
                  {selectedJob.salary}
                </span>
                <span className="flex items-center">
                  <FaBriefcase className="h-4 w-4 mr-1 text-gray-400" />
                  {selectedJob.type}
                </span>
                <span className="flex items-center text-cyan-500">
                  <FaClock className="h-4 w-4 mr-1" />
                  Posted {selectedJob.posted}
                </span>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaBriefcase className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Job Description
              </h2>
            </div>
            <p className="text-gray-600">{selectedJob.description}</p>
          </div>

          {/* Requirements */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaListUl className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Requirements
              </h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {selectedJob.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaGift className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Benefits</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              {selectedJob.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>

          {/* Apply Now */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaPaperPlane className="h-5 w-5 text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                Apply for this Position
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Submit your application now to join the team at{" "}
              {selectedJob.company}.
            </p>
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
              Apply Now
            </button>
          </div>
        </>
      ) : (
        // Jobs List View
        <>
          {/* Header */}
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900">Available Jobs</h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse and apply for the latest job openings.
            </p>
          </div>

          {/* Job Listings */}
          {jobsData.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => viewJobDetails(job)}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">
                    {job.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaBuilding className="h-3.5 w-3.5 mr-1" />
                      {job.company}
                    </span>
                    <span className="hidden md:flex">•</span>
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="h-3.5 w-3.5 mr-1" />
                      {job.location}
                    </span>
                    <span className="hidden md:flex">•</span>
                    <span className="flex items-center">
                      <FaDollarSign className="h-3.5 w-3.5 mr-1" />
                      {job.salary}
                    </span>
                    <span className="hidden md:flex">•</span>
                    <span className="flex items-center">
                      <FaBriefcase className="h-3.5 w-3.5 mr-1" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 flex items-center space-x-4">
                  <span className="text-xs text-gray-500">
                    Posted {job.posted}
                  </span>
                  <button className="text-sm font-medium text-cyan-500 hover:text-cyan-700">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
