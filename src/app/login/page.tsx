"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    try {
      // Simulate API call
      localStorage.setItem("user", JSON.stringify(formData));
      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err:unknown) {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
        <div>
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-lg">
              <span className="font-bold text-2xl">Job</span>
              <span className="font-light">Portal</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Or{" "}
            <Link
              href="/signup"
              className="font-medium text-cyan-400 hover:text-cyan-300"
            >
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Radio Buttons for Job Seeker or Employer */}
          <div className="flex items-center justify-around mt-4">
            <label className="inline-flex items-center text-sm text-gray-300">
              <input
                type="radio"
                name="userRole"
                value="jobseeker"
                defaultChecked
                className="mr-2 h-4 w-4 text-cyan-400 border-white/20 bg-white/10 rounded focus:ring-cyan-400"
              />
              Job Seeker
            </label>
            <label className="inline-flex items-center text-sm text-gray-300">
              <input
                type="radio"
                name="userRole"
                value="employer"
                className="mr-2 h-4 w-4 text-cyan-400 border-white/20 bg-white/10 rounded focus:ring-cyan-400"
              />
              Employer
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-cyan-400 focus:ring-cyan-400 border-white/20 rounded bg-white/10"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                href="/forgot-password"
                className="font-medium text-cyan-400 hover:text-cyan-300"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 transition-all duration-200"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-gray-300">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 text-sm font-medium text-gray-300 hover:bg-white/20 transition-colors">
              <FaGoogle className="h-5 w-5" />
            </button>
            <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 text-sm font-medium text-gray-300 hover:bg-white/20 transition-colors">
              <FaGithub className="h-5 w-5" />
            </button>
            <button className="w-full inline-flex justify-center py-3 px-4 border border-white/20 rounded-xl shadow-sm bg-white/10 text-sm font-medium text-gray-300 hover:bg-white/20 transition-colors">
              <FaLinkedin className="h-5 w-5" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}