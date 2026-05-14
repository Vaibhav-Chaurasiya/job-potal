"use client";

import { useState } from "react";
import { FaBell, FaLock, FaGlobe, FaTrash } from "react-icons/fa";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      jobAlerts: true,
      applicationUpdates: true,
      marketing: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: true,
      showPhone: false,
      showLocation: true,
    },
    language: "default",
    timezone: "UTC+5:30",
  });

  const handleNotificationChange = (key: string) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]:
          !settings.notifications[key as keyof typeof settings.notifications],
      },
    });
  };

  const handlePrivacyChange = (key: string) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key as keyof typeof settings.privacy],
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Notifications */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaBell className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Notifications
              </label>
              <p className="text-sm text-gray-500">
                Receive notifications via email
              </p>
            </div>
            <button
              type="button"
              className={`${
                settings.notifications.email ? "bg-cyan-500" : "bg-gray-200"
              } relative inline-flex  h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
              onClick={() => handleNotificationChange("email")}
            >
              <span
                className={`${
                  settings.notifications.email
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Push Notifications
              </label>
              <p className="text-sm text-gray-500">
                Receive push notifications in browser
              </p>
            </div>
            <button
              type="button"
              className={`${
                settings.notifications.push ? "bg-cyan-500" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
              onClick={() => handleNotificationChange("push")}
            >
              <span
                className={`${
                  settings.notifications.push
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Job Alerts
              </label>
              <p className="text-sm text-gray-500">
                Get notified about new job matches
              </p>
            </div>
            <button
              type="button"
              className={`${
                settings.notifications.jobAlerts ? "bg-cyan-500" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
              onClick={() => handleNotificationChange("jobAlerts")}
            >
              <span
                className={`${
                  settings.notifications.jobAlerts
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Application Updates
              </label>
              <p className="text-sm text-gray-500">
                Get notified about application status changes
              </p>
            </div>
            <button
              type="button"
              className={`${
                settings.notifications.applicationUpdates
                  ? "bg-cyan-500"
                  : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
              onClick={() => handleNotificationChange("applicationUpdates")}
            >
              <span
                className={`${
                  settings.notifications.applicationUpdates
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Marketing Emails
              </label>
              <p className="text-sm text-gray-500">
                Receive updates about new features and promotions
              </p>
            </div>
            <button
              type="button"
              className={`${
                settings.notifications.marketing ? "bg-cyan-500" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
              onClick={() => handleNotificationChange("marketing")}
            >
              <span
                className={`${
                  settings.notifications.marketing
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaLock className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Privacy</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Profile Visibility
            </label>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  privacy: {
                    ...settings.privacy,
                    profileVisibility: e.target.value,
                  },
                })
              }
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="connections">Connections Only</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Show Email
              </label>
              <p className="text-sm text-gray-500">
                Allow others to see your email address
              </p>
            </div>
            <button
              type="button"
              className={`${
                settings.privacy.showEmail ? "bg-cyan-500" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
              onClick={() => handlePrivacyChange("showEmail")}
            >
              <span
                className={`${
                  settings.privacy.showEmail ? "translate-x-5" : "translate-x-0"
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Show Phone
              </label>
              <p className="text-sm text-gray-500">
                Allow others to see your phone number
              </p>
            </div>
            <button
              type="button"
              className={`${
                settings.privacy.showPhone ? "bg-cyan-500" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
              onClick={() => handlePrivacyChange("showPhone")}
            >
              <span
                className={`${
                  settings.privacy.showPhone ? "translate-x-5" : "translate-x-0"
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Show Location
              </label>
              <p className="text-sm text-gray-500">
                Allow others to see your location
              </p>
            </div>
            <button
              type="button"
              className={`${
                settings.privacy.showLocation ? "bg-cyan-500" : "bg-gray-200"
              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
              onClick={() => handlePrivacyChange("showLocation")}
            >
              <span
                className={`${
                  settings.privacy.showLocation
                    ? "translate-x-5"
                    : "translate-x-0"
                } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaGlobe className="h-5 w-5 text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Preferences</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Language
            </label>
            <select
              value={settings.language}
              onChange={(e) =>
                setSettings({ ...settings, language: e.target.value })
              }
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
            >
              <option value="default">Default (System Language)</option>
              <option value="English">English</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={(e) =>
                setSettings({ ...settings, timezone: e.target.value })
              }
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md"
            >
              <option value="UTC-12">
                UTC-12:00 (Baker Island, Howland Island)
              </option>
              <option value="UTC-11">UTC-11:00 (American Samoa, Niue)</option>
              <option value="UTC-10">
                UTC-10:00 (Hawaii-Aleutian Time, Tahiti)
              </option>
              <option value="UTC-9:30">UTC-09:30 (Marquesas Islands)</option>
              <option value="UTC-9">UTC-09:00 (Alaska Time)</option>
              <option value="UTC-8">
                UTC-08:00 (Pacific Time, Los Angeles)
              </option>
              <option value="UTC-7">UTC-07:00 (Mountain Time, Denver)</option>
              <option value="UTC-6">UTC-06:00 (Central Time, Chicago)</option>
              <option value="UTC-5">UTC-05:00 (Eastern Time, New York)</option>
              <option value="UTC-4:30">
                UTC-04:30 (Venezuela Time, Caracas)
              </option>
              <option value="UTC-4">UTC-04:00 (Atlantic Time, La Paz)</option>
              <option value="UTC-3:30">
                UTC-03:30 (Newfoundland Time, St. John)
              </option>
              <option value="UTC-3">UTC-03:00 (Buenos Aires, São Paulo)</option>
              <option value="UTC-2">
                UTC-02:00 (South Georgia & South Sandwich Islands)
              </option>
              <option value="UTC-1">UTC-01:00 (Azores, Cape Verde)</option>
              <option value="UTC+0">
                UTC+00:00 (Greenwich Mean Time, London)
              </option>
              <option value="UTC+1">
                UTC+01:00 (Central European Time, Berlin)
              </option>
              <option value="UTC+2">
                UTC+02:00 (Eastern European Time, Cairo)
              </option>
              <option value="UTC+3">UTC+03:00 (Moscow Time, Nairobi)</option>
              <option value="UTC+3:30">
                UTC+03:30 (Iran Standard Time, Tehran)
              </option>
              <option value="UTC+4">UTC+04:00 (Dubai, Samara)</option>
              <option value="UTC+4:30">
                UTC+04:30 (Afghanistan Time, Kabul)
              </option>
              <option value="UTC+5">
                UTC+05:00 (Pakistan Standard Time, Karachi)
              </option>
              <option value="UTC+5:30">
                UTC+05:30 (Indian Standard Time, New Delhi)
              </option>
              <option value="UTC+5:45">
                UTC+05:45 (Nepal Time, Kathmandu)
              </option>
              <option value="UTC+6">UTC+06:00 (Bangladesh Time, Dhaka)</option>
              <option value="UTC+6:30">
                UTC+06:30 (Cocos Islands, Yangon)
              </option>
              <option value="UTC+7">UTC+07:00 (Indochina Time, Bangkok)</option>
              <option value="UTC+8">
                UTC+08:00 (China Standard Time, Beijing)
              </option>
              <option value="UTC+8:45">
                UTC+08:45 (Australian Central Western Time)
              </option>
              <option value="UTC+9">
                UTC+09:00 (Japan Standard Time, Tokyo)
              </option>
              <option value="UTC+9:30">
                UTC+09:30 (Australian Central Time, Adelaide)
              </option>
              <option value="UTC+10">
                UTC+10:00 (Australian Eastern Time, Sydney)
              </option>
              <option value="UTC+10:30">UTC+10:30 (Lord Howe Island)</option>
              <option value="UTC+11">
                UTC+11:00 (Solomon Islands, New Caledonia)
              </option>
              <option value="UTC+12">UTC+12:00 (Fiji, Kamchatka)</option>
              <option value="UTC+12:45">UTC+12:45 (Chatham Islands)</option>
              <option value="UTC+13">UTC+13:00 (Tonga, Samoa)</option>
              <option value="UTC+14">UTC+14:00 (Line Islands, Kiribati)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center mb-4">
          <FaTrash className="h-5 w-5 text-red-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Danger Zone</h2>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              Delete Account
            </h3>
            <p className="text-sm text-gray-500">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <button
              type="button"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
