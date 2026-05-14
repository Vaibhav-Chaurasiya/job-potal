"use client";

import React, { useEffect, useState } from "react";
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

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

interface Education {
  school: string;
  degree: string;
  period: string;
}

interface Social {
  linkedin: string;
  github: string;
  website: string;
}

interface Profile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  bio: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  social: Social;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] =
    useState<Profile | null>(null);

  const [profile, setProfile] = useState<Profile>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
    bio: "Passionate frontend developer with 5+ years of experience in React and modern web technologies.",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js"],

    experience: [
      {
        company: "Tech Corp",
        role: "Senior Frontend Developer",
        period: "2020 - Present",
        description:
          "Leading frontend development team and implementing new features.",
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

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setIsEditing(false);

    localStorage.setItem(
      "user",
      JSON.stringify(profile)
    );

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

  const removeExperience = (index: number) => {
    const newExperience = [...profile.experience];

    newExperience.splice(index, 1);

    setProfile({
      ...profile,
      experience: newExperience,
    });
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
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

  const removeEducation = (index: number) => {
    const newEducation = [...profile.education];

    newEducation.splice(index, 1);

    setProfile({
      ...profile,
      education: newEducation,
    });
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
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

  return (
    <div className="space-y-6 p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Profile
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your personal information.
            </p>
          </div>

          <div className="space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={cancelEditing}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  form="profile-form"
                  className="px-4 py-2 rounded-lg text-white bg-cyan-600"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={startEditing}
                className="px-4 py-2 rounded-lg text-white bg-cyan-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      <form
        id="profile-form"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium mb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium">
                Full Name
              </label>

              <div className="mt-1 relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />

                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      fullName: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="w-full pl-10 border rounded-md p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">
                Email
              </label>

              <div className="mt-1 relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />

                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      email: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="w-full pl-10 border rounded-md p-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">
              Experience
            </h2>

            {isEditing && (
              <button
                type="button"
                onClick={addExperience}
                className="bg-cyan-600 text-white px-3 py-2 rounded-lg flex items-center gap-2"
              >
                <FaPlus />
                Add
              </button>
            )}
          </div>

          <div className="space-y-6">
            {profile.experience.map((exp, index) => (
              <div
                key={index}
                className="border-b pb-4"
              >
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "role",
                          e.target.value
                        )
                      }
                      className="w-full border rounded-md p-2 mb-2"
                    />

                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "company",
                          e.target.value
                        )
                      }
                      className="w-full border rounded-md p-2 mb-2"
                    />

                    <textarea
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      className="w-full border rounded-md p-2"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeExperience(index)
                      }
                      className="mt-2 text-red-500 flex items-center gap-2"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="font-semibold">
                      {exp.role}
                    </h3>

                    <p className="text-gray-500">
                      {exp.company}
                    </p>

                    <p className="text-sm text-gray-500">
                      {exp.description}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}