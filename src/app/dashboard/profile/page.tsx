"use client";

import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    bio: "Passionate frontend developer with 5+ years of experience in React and modern web technologies. Focused on creating beautiful and performant user experiences.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],
    experience: [
      {
        company: "Tech Corp",
        role: "Senior Frontend Developer",
        period: "2020 - Present",
        description:
          "Leading frontend development team and implementing new features using React and TypeScript.",
      },
      {
        company: "Digital Agency",
        role: "Frontend Developer",
        period: "2018 - 2020",
        description:
          "Developed and maintained multiple client websites using modern web technologies.",
      },
    ],
    education: [
      {
        school: "University of Technology",
        degree: "Bachelor of Computer Science",
        period: "2014 - 2018",
      },
    ],
    social: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      website: "https://johndoe.dev",
    },
  });

  const startEditing = () => {
    setOriginalProfile(JSON.parse(JSON.stringify(profile)));
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (originalProfile) {
      setProfile(originalProfile);
    }
    setIsEditing(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    localStorage.setItem("user", JSON.stringify(profile));
    setOriginalProfile(null);
  };

  const addExperience = () => {
    setProfile({
      ...profile,
      experience: [
        ...profile.experience,
        {
          company: "",
          role: "",
          period: "",
          description: "",
        },
      ],
    });
  };

  const removeExperience = (index:number) => {
    const newExperience = [...profile.experience];
    newExperience.splice(index, 1);
    setProfile({
      ...profile,
      experience: newExperience,
    });
  };

  const updateExperience = (index:number, field:string, value:any) => {
    const newExperience = [...profile.experience];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value,
    };
    setProfile({
      ...profile,
      experience: newExperience,
    });
  };

  const addEducation = () => {
    setProfile({
      ...profile,
      education: [
        ...profile.education,
        {
          school: "",
          degree: "",
          period: "",
        },
      ],
    });
  };

  const removeEducation = (index:number) => {
    const newEducation = [...profile.education];
    newEducation.splice(index, 1);
    setProfile({
      ...profile,
      education: newEducation,
    });
  };

  const updateEducation = (index:number, field:string, value:any) => {
    const newEducation = [...profile.education];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value,
    };
    setProfile({
      ...profile,
      education: newEducation,
    });
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...parsedUser,
      }));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your personal information and professional details.
            </p>
          </div>
          <div className="space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={cancelEditing}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  form="profile-form"
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={startEditing}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({ ...profile, fullName: e.target.value })
                  }
                  disabled={!isEditing}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  disabled={!isEditing}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Professional Information
          </h2>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Professional Title
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBriefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={profile.title}
                  onChange={(e) =>
                    setProfile({ ...profile, title: e.target.value })
                  }
                  disabled={!isEditing}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  disabled={!isEditing}
                  className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700"
              >
                Skills
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  value={profile.skills.join(", ")}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  disabled={!isEditing}
                  className="block w-full sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                  placeholder="Enter skills separated by commas"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Social Links
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700"
              >
                LinkedIn
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLinkedin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  value={profile.social.linkedin}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      social: { ...profile.social, linkedin: e.target.value },
                    })
                  }
                  disabled={!isEditing}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700"
              >
                GitHub
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGithub className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="github"
                  id="github"
                  value={profile.social.github}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      social: { ...profile.social, github: e.target.value },
                    })
                  }
                  disabled={!isEditing}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                Website
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaGlobe className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  name="website"
                  id="website"
                  value={profile.social.website}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      social: { ...profile.social, website: e.target.value },
                    })
                  }
                  disabled={!isEditing}
                  className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Experience</h2>
            {isEditing && (
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <FaPlus className="mr-1.5 h-3 w-3" />
                Add
              </button>
            )}
          </div>

          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="w-full pr-2">
                        <label className="block text-xs font-medium text-gray-500">
                          Role
                        </label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) =>
                            updateExperience(index, "role", e.target.value)
                          }
                          className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="ml-2 mt-6 inline-flex items-center px-2.5 py-1.5 border border-transparent rounded text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <FaTrash className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500">
                          Company
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            updateExperience(index, "company", e.target.value)
                          }
                          className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">
                          Period
                        </label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) =>
                            updateExperience(index, "period", e.target.value)
                          }
                          className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500">
                        Description
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(index, "description", e.target.value)
                        }
                        rows={3}
                        className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-gray-500">{exp.company}</p>
                      </div>
                      <p className="text-sm text-gray-500">{exp.period}</p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {exp.description}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {profile.experience.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No experience added yet.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Education</h2>
            {isEditing && (
              <button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <FaPlus className="mr-1.5 h-3 w-3" />
                Add
              </button>
            )}
          </div>

          <div className="space-y-6">
            {profile.education.map((edu, index) => (
              <div
                key={index}
                className={`${
                  isEditing ? "border-b border-gray-200 pb-6" : "flex items-start"
                }`}
              >
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <div className="w-full pr-2">
                        <label className="block text-xs font-medium text-gray-500">
                          Degree
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) =>
                            updateEducation(index, "degree", e.target.value)
                          }
                          className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="ml-2 mt-6 inline-flex items-center px-2.5 py-1.5 border border-transparent rounded text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <FaTrash className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500">
                          School
                        </label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) =>
                            updateEducation(index, "school", e.target.value)
                          }
                          className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500">
                          Period
                        </label>
                        <input
                          type="text"
                          value={edu.period}
                          onChange={(e) =>
                            updateEducation(index, "period", e.target.value)
                          }
                          className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-shrink-0">
                      <FaGraduationCap className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900">
                        {edu.degree}
                      </h3>
                      <p className="text-sm text-gray-500">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.period}</p>
                    </div>
                  </>
                )}
              </div>
            ))}

            {profile.education.length === 0 && (
              <p className="text-sm text-gray-500 italic">
                No education added yet.
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
