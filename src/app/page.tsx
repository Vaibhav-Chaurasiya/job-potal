"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaSearch,
  FaBriefcase,
  FaUsers,
  FaChartLine,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
  FaBars,
  FaTimes,
  FaStar,
  FaRegLightbulb,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";

// Register GSAP plugins
// if (typeof window !== 'undefined') {

gsap.registerPlugin(ScrollTrigger);
// }

// Define types
interface Job {
  color: string;
  hoverColor: string;
  buttonGradient: string;
  company: string;
  jobType: string;
  jobTypeColor: string;
  title: string;
  companyName: string;
  skills: string[];
  location: string;
  posted: string;
  salary: string;
}

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// interface NavItem {
//   label: string;
//   active: boolean;
//   icon: string;
// }

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLDivElement>(null);

  const getUsers = async () => {
    
    const getUser= localStorage.getItem("user");
    console.log(getUser);
  }

  // Add at the beginning of your component
  useEffect(() => {
    getUsers();

    const checkPerformance = () => {
      const isLowEndDevice =
        // Check for low CPU cores
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        // Check for mobile Safari
        /iPhone|iPad/.test(navigator.userAgent) ||
        // Check for older Android
        /Android [4-7]/.test(navigator.userAgent) ||
        // Check for small mobile screen
        window.innerWidth < 768;

      if (isLowEndDevice) {
        document.body.classList.add("low-end");
      }

      // Also respect user preference
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.body.classList.add("reduce-motion");
      }
    };

    // Run check when component mounts
    checkPerformance();
  }, []);

  // Simulate loading state
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Animation for loading screen
  useEffect(() => {
    if (loadingRef.current && isLoading) {
      gsap.to(loadingRef.current.querySelector(".loading-logo"), {
        scale: 1.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(loadingRef.current.querySelectorAll(".loading-dot"), {
        scale: 1.2,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, [isLoading]);

  // Setup back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to open job application modal
  const openJobModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    // go to login page
    window.location.href = "/login";

    // Freeze body scroll when modal is open
    // document.body.style.overflow = "hidden";
  };

  // Function to close job application modal
  const closeJobModal = () => {
    setIsModalOpen(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = "auto";
  };

  // Handle click outside modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeJobModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // Add escape key handler for modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeJobModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isModalOpen]);

  // Animation for modal opening
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [isModalOpen]);

  // Setup scroll progress bar
  useEffect(() => {
    const updateProgressBar = () => {
      if (progressBarRef.current) {
        const scrollTotal =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = window.scrollY / scrollTotal;
        gsap.to(progressBarRef.current, {
          scaleX: scrollProgress,
          ease: "none",
          duration: 0.3,
        });
      }
    };

    window.addEventListener("scroll", updateProgressBar);
    return () => window.removeEventListener("scroll", updateProgressBar);
  }, []);

  // Setup GSAP animations on component mount
  useEffect(() => {
    // Animate the background blobs
    gsap.to(blob1Ref.current, {
      scale: 1.1,
      x: 30,
      y: -50,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(blob2Ref.current, {
      scale: 0.9,
      x: -30,
      y: 50,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 2,
    });

    gsap.to(blob3Ref.current, {
      scale: 1.2,
      x: 20,
      y: -20,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 4,
    });

    // Animate header elements
    gsap.from(logoRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.5,
      ease: "power2.out",
    });

    // Animate the 3D cube
    if (cubeRef.current) {
      gsap.to(cubeRef.current, {
        rotationY: 360,
        rotationX: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }

    // Generate and animate particles
    if (particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle) => {
        gsap.to(particle, {
          x: gsap.utils.random(-100, 100),
          y: gsap.utils.random(-100, 100),
          scale: gsap.utils.random(0.5, 1),
          duration: gsap.utils.random(10, 20),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }

    // Animate navigation links
    const navLinks = document.querySelectorAll(".nav-link");
    gsap.fromTo(
      navLinks,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.5,
      }
    );

    // Animate auth buttons
    const authButtons = document.querySelectorAll(".auth-button");
    gsap.fromTo(
      authButtons,
      { opacity: 0, y: -10 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.8,
      }
    );

    // Parallax effect for background blobs
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const scrollProgress = self.progress;

        if (blob1Ref.current) {
          gsap.to(blob1Ref.current, {
            y: scrollProgress * -100,
            duration: 0.5,
            overwrite: "auto",
          });
        }

        if (blob2Ref.current) {
          gsap.to(blob2Ref.current, {
            y: scrollProgress * 150,
            duration: 0.5,
            overwrite: "auto",
          });
        }

        if (blob3Ref.current) {
          gsap.to(blob3Ref.current, {
            y: scrollProgress * -75,
            duration: 0.5,
            overwrite: "auto",
          });
        }
      },
    });

    // Mouse follow effect for hero section
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const moveX = clientX - window.innerWidth / 2;
        const moveY = clientY - window.innerHeight / 2;

        if (cubeRef.current) {
          gsap.to(cubeRef.current, {
            x: moveX * 0.05,
            y: moveY * 0.05,
            duration: 1,
            ease: "power2.out",
          });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  // Setup smooth scrolling for anchor links
  useEffect(() => {
    if (typeof window !== "undefined") {
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach((link) => {
        link.addEventListener("click", (e: Event) => {
          e.preventDefault();
          const target = e.currentTarget as HTMLAnchorElement;
          const targetId = target.getAttribute("href");
          if (!targetId) return;

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top:
                targetElement.getBoundingClientRect().top + window.scrollY - 80,
              behavior: "smooth",
            });
          }
        });
      });
    }
  }, []);

  // Create particles for background
  const renderParticles = () => {
    return Array.from({ length: 20 }).map((_, index) => {
      const randomSize = Math.random() * 100 + 50;
      const randomColor = `rgba(${Math.random() * 255}, ${
        Math.random() * 255
      }, ${Math.random() * 255}, 0.15)`;

      return (
        <div
          key={index}
          className="particle absolute rounded-full mix-blend-screen filter blur-sm"
          style={{
            background: randomColor,
            width: randomSize,
            height: randomSize,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      );
    });
  };

  // Scroll animation for sections
  const FadeInSection = ({
    children,
    delay = 0,
    className,
  }: FadeInSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const section = sectionRef.current;

      if (section) {
        gsap.set(section, { y: 50, opacity: 0 });

        ScrollTrigger.create({
          trigger: section,
          start: "top 80%",
          onEnter: () => {
            gsap.to(section, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: delay,
              ease: "power2.out",
            });
          },
        });
      }
    }, [delay]);

    return (
      <div ref={sectionRef} className={className}>
        {children}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden">
      {/* Loading Screen */}
      {isLoading && (
        <div
          ref={loadingRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800"
        >
          <div className="text-center">
            <div className="loading-logo bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-2xl mb-6 mx-auto inline-flex">
              <span className="font-bold text-2xl">Job</span>
              <span className="font-light">Portal</span>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
              <div className="loading-dot w-3 h-3 rounded-full bg-cyan-500 opacity-50"></div>
              <div className="loading-dot w-3 h-3 rounded-full bg-blue-500 opacity-50"></div>
              <div className="loading-dot w-3 h-3 rounded-full bg-purple-500 opacity-50"></div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-pink-400 z-50 origin-left"
      />

      {/* Animated Particles Background */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0">
        {renderParticles()}
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          ref={blob1Ref}
          className="absolute top-40 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <div
          ref={blob2Ref}
          className="absolute top-0 right-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <div
          ref={blob3Ref}
          className="absolute bottom-40 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Header with Glass Effect */}
      <header
        ref={headerRef}
        className="sticky top-0 z-50 w-full lg:px-32 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg"
      >
        <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-6">
          <div ref={logoRef} className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-lg">
              <span className="font-bold text-xl">Job</span>
              <span className="font-light">Portal</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {["features", "jobs", "testimonials", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="nav-link relative px-2 py-1 font-medium text-gray-200 hover:text-white transition-colors duration-300 group"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                {/* <span className="absolute -bottom-1 left-1/2 w-1 h-1 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-100 transform -translate-x-1/2 transition-all duration-300 delay-150"></span> */}
              </a>
            ))}
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              {mobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className="hidden md:flex space-x-4">
            <Link href="/login">
              <button
                className="auth-button border border-white/30 hover:bg-white/10 px-4 py-2 rounded-full transition-all"
                style={{ opacity: 0, transform: "translateY(-10px)" }}
              >
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button
                className="auth-button bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-5 py-2 rounded-full shadow-lg transition-all"
                style={{ opacity: 0, transform: "translateY(-10px)" }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden mobile-menu ${
            mobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
            <nav className="flex flex-col space-y-3">
              {["features", "jobs", "testimonials", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="font-medium hover:text-cyan-300 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
              <div className="flex space-x-2 pt-3">
                <button className="flex-1 border border-white/30 hover:bg-white/10 px-4 py-2 rounded-full transition-all">
                  Login
                </button>
                <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-5 py-2 rounded-full shadow-lg transition-all">
                  Sign Up
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main
        ref={heroRef}
        className="flex flex-col items-center justify-center flex-1 text-center px-4 py-20 md:py-32 relative"
      >
        {/* 3D Rotating Element */}
        <div className="absolute right-10 top-10 md:right-32 md:top-32 hidden md:block">
          <div ref={cubeRef} className="cube w-32 h-32 relative">
            <div className="absolute inset-0 w-full h-full border-2 border-cyan-400 rounded-lg transform rotate-45 opacity-60" />
            <div className="absolute inset-0 w-full h-full border-2 border-pink-400 rounded-lg transform rotate-90 opacity-60" />
            <div className="absolute inset-0 w-full h-full border-2 border-purple-400 rounded-lg transform -rotate-45 opacity-60" />
          </div>
        </div>

        <FadeInSection className="w-full">
          <h1 className="hero-title text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
            Discover Your Dream Career
          </h1>
        </FadeInSection>

        <FadeInSection delay={0.2} className="w-full">
          <p className="hero-description text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-200">
            Connect with top employers and find the perfect job opportunity that
            matches your skills and aspirations.
          </p>
        </FadeInSection>

        {/* Search Bar */}
        <FadeInSection delay={0.4} className="w-full max-w-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const params = new URLSearchParams();
              formData.forEach((value, key) => {
                if (value) params.append(key, value.toString());
              });
              window.location.href = `/search?${params.toString()}`;
            }}
            className="search-bar bg-white/10 backdrop-blur-md p-4 rounded-2xl mb-12 border border-white/20 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow group">
                <FaSearch className="absolute left-4 top-3.5 text-gray-300 group-hover:text-cyan-300 transition-colors" />
                <input
                  type="text"
                  name="keyword"
                  placeholder="Job title or keyword"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all group-hover:border-cyan-300/50"
                />
              </div>
              <button
                type="submit"
                className="search-btn bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all relative overflow-hidden group hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Search Jobs</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              </button>
            </div>

            {/* Advanced Search Filters - Expandable */}
            <div className="mt-4 overflow-hidden transition-all">
              <button
                type="button"
                className="flex items-center justify-center w-full text-center text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                onClick={() => {
                  const filtersEl = document.getElementById("advanced-filters");
                  if (filtersEl) {
                    if (filtersEl.classList.contains("h-0")) {
                      filtersEl.classList.remove("h-0");
                      filtersEl.classList.add("h-auto");
                    } else {
                      filtersEl.classList.remove("h-auto");
                      filtersEl.classList.add("h-0");
                    }
                  }
                }}
              >
                Advanced Filters
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                id="advanced-filters"
                className="overflow-hidden transition-all duration-300 h-0"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 m-1">
                  <div className="relative">
                    <select
                      name="jobType"
                      className="w-full pl-4 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all appearance-none text-white"
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                        className="text-gray-500 bg-white/10"
                      >
                        Job Type
                      </option>
                      <option value="full-time" className="text-green-500">
                        🕒 Full-time
                      </option>
                      <option value="part-time" className="text-blue-500">
                        ⏳ Part-time
                      </option>
                      <option value="contract" className="text-orange-500">
                        📜 Contract
                      </option>
                      <option value="freelance" className="text-purple-500">
                        💻 Freelance
                      </option>
                      <option value="remote" className="text-teal-500">
                        🌍 Remote
                      </option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="experience"
                      className="w-full pl-4 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all appearance-none"
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                        className="text-gray-500 bg-white"
                      >
                        Experience Level
                      </option>
                      <option value="entry" className="text-green-500">
                        🟢 Entry Level
                      </option>
                      <option value="mid" className="text-blue-500">
                        🔵 Mid Level
                      </option>
                      <option value="senior" className="text-orange-500">
                        🟠 Senior Level
                      </option>
                      <option value="executive" className="text-purple-500">
                        🟣 Executive
                      </option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="salary"
                      className="w-full pl-4 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all appearance-none text-white"
                      defaultValue=""
                    >
                      <option
                        value=""
                        disabled
                        className="text-gray-500 bg-white/10"
                      >
                        Salary Range
                      </option>
                      <option value="0-10" className="text-green-500">
                        💸 ₹0-10 LPA
                      </option>
                      <option value="10-20" className="text-blue-500">
                        💸 ₹10-20 LPA
                      </option>
                      <option value="20-30" className="text-orange-500">
                        💸 ₹20-30 LPA
                      </option>
                      <option value="30-plus" className="text-purple-500">
                        💸 ₹30+ LPA
                      </option>
                    </select>
                    <div className="absolute right-4 top-3.5 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  <div className="text-sm text-gray-300 mr-2 mt-1">
                    Popular Skills:
                  </div>
                  {[
                    "React",
                    "Java",
                    "Python",
                    "TypeScript",
                    "AWS",
                    "UI/UX",
                    "Node.js",
                  ].map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={(e) => {
                        const input = document.createElement("input");
                        input.type = "hidden";
                        input.name = "skills";
                        input.value = skill;
                        e.currentTarget.closest("form")?.appendChild(input);
                      }}
                      className="text-sm py-1 px-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 hover:border-cyan-400/30 transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </FadeInSection>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl">
          {[
            { number: "10,000+", text: "Active Jobs" },
            { number: "5,000+", text: "Companies" },
            { number: "20M+", text: "Job Seekers" },
          ].map((stat, index) => (
            <FadeInSection
              key={index}
              delay={0.6 + index * 0.2}
              className="w-full"
            >
              <div className="stat-card bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                  {stat.number}
                </p>
                <p className="text-gray-300">{stat.text}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </main>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 lg:px-32 bg-gradient-to-b from-indigo-900 to-violet-950"
      >
        <div className="container mx-auto px-4">
          <FadeInSection className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                Why Choose Us
              </span>
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2} className="w-full">
            <p className="text-xl text-center max-w-2xl mx-auto mb-16 text-gray-300">
              Our platform offers the best features to help you find your dream
              job quickly and efficiently.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBriefcase className="text-2xl" />,
                title: "Smart Job Matching",
                description:
                  "Our AI-powered algorithm matches your skills and experience with the perfect job opportunities.",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: <FaUsers className="text-2xl" />,
                title: "Direct Employer Contact",
                description:
                  "Connect directly with hiring managers and recruiters without intermediaries.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: <FaChartLine className="text-2xl" />,
                title: "Career Growth Tools",
                description:
                  "Access resources, courses, and tools to help you advance in your career journey.",
                gradient: "from-amber-500 to-red-500",
              },
              {
                icon: <FaRegLightbulb className="text-2xl" />,
                title: "Personalized Insights",
                description:
                  "Get customized recommendations and industry insights tailored to your career goals.",
                gradient: "from-green-500 to-teal-500",
              },
              {
                icon: <FaStar className="text-2xl" />,
                title: "Premium Job Alerts",
                description:
                  "Receive instant notifications for high-demand positions that match your profile.",
                gradient: "from-blue-500 to-indigo-500",
              },
              {
                icon: <FaMapMarkerAlt className="text-2xl" />,
                title: "Location Flexibility",
                description:
                  "Find opportunities with flexible work arrangements including remote and hybrid options.",
                gradient: "from-pink-500 to-rose-500",
              },
            ].map((feature, index) => (
              <FadeInSection
                key={index}
                delay={0.4 + index * 0.1}
                className="w-full"
              >
                <div className="feature-card bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:shadow-xl group h-full relative hover:-translate-y-2">
                  {/* Glowing effect on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity`}
                  ></div>

                  <div
                    className={`feature-icon bg-gradient-to-r ${feature.gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative hover:rotate-3`}
                  >
                    {/* Animated halo effect */}
                    <div className="absolute inset-0 rounded-xl opacity-60 pulse-animation"></div>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 relative z-10">
                    {feature.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section
        id="jobs"
        className="py-20 lg:px-32 bg-gradient-to-b from-violet-950 to-purple-950"
      >
        <div className="container mx-auto px-4">
          <FadeInSection className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                Featured Jobs
              </span>
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2} className="w-full">
            <p className="text-xl text-center max-w-2xl mx-auto mb-16 text-gray-300">
              Explore our handpicked selection of top job opportunities from
              leading companies.
            </p>
          </FadeInSection>

          {/* Job filter buttons */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-wrap gap-3 justify-center mb-8">
            {[
              { id: "all", label: "All Jobs" },
              { id: "remote", label: "Remote" },
              { id: "full-time", label: "Full-time" },
              { id: "contract", label: "Contract" },
              { id: "trending", label: "Trending" },
            ].map((filter) => (
              <button
                key={filter.id}
                className={`py-2 px-4 rounded-full transition-all ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
                    : "bg-white/10 hover:bg-white/20 text-gray-300"
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Job Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                color: "from-blue-600 to-cyan-600",
                hoverColor: "text-cyan-300",
                buttonGradient:
                  "from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
                company: "MS",
                jobType: "Full-time",
                jobTypeColor: "text-cyan-300",
                title: "Senior Frontend Developer",
                companyName: "Microsoft Corporation",
                skills: ["React", "TypeScript", "Redux"],
                location: "Bangalore, India",
                posted: "Posted 2 days ago",
                salary: "₹25-35 LPA",
              },
              {
                color: "from-purple-600 to-pink-600",
                hoverColor: "text-purple-300",
                buttonGradient:
                  "from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
                company: "AM",
                jobType: "Remote",
                jobTypeColor: "text-purple-300",
                title: "Data Scientist",
                companyName: "Amazon Web Services",
                skills: ["Python", "Machine Learning", "SQL"],
                location: "Remote (India)",
                posted: "Posted 5 days ago",
                salary: "₹20-30 LPA",
              },
              {
                color: "from-amber-500 to-orange-600",
                hoverColor: "text-orange-300",
                buttonGradient:
                  "from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600",
                company: "GP",
                jobType: "Hybrid",
                jobTypeColor: "text-orange-300",
                title: "Product Manager",
                companyName: "Google",
                skills: ["Agile", "UX", "Analytics"],
                location: "Hyderabad, India",
                posted: "Posted 1 week ago",
                salary: "₹30-45 LPA",
              },
            ].map((job, index) => (
              <FadeInSection
                key={index}
                delay={0.4 + index * 0.2}
                className="w-full"
              >
                <div className="job-card bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden hover:shadow-2xl transition-all group relative hover:-translate-y-2">
                  {/* Glowing effect on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${job.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`}
                  ></div>

                  <div className={`bg-gradient-to-r ${job.color} h-3`}></div>
                  <div className="p-6 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`company-logo bg-gradient-to-r ${job.color} w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg hover:scale-110 hover:rotate-3 transition-transform`}
                      >
                        <span className="text-xl font-bold">{job.company}</span>
                      </div>
                      <span
                        className={`bg-white/10 ${job.jobTypeColor} text-sm py-1 px-3 rounded-full`}
                      >
                        {job.jobType}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl font-semibold mb-2 group-hover:${job.hoverColor} transition-colors`}
                    >
                      {job.title}
                    </h3>
                    <p className="text-gray-400 mb-4">{job.companyName}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {job.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className={`skill-tag bg-white/5 text-sm py-1 px-3 rounded-full border border-white/5 group-hover:border-${
                            job.color.split("-")[2]
                          }-400/30  hover:scale-110 hover:bg-white/15 transition-all`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="flex items-center text-gray-300">
                        <FaMapMarkerAlt
                          className={`mr-2 text-gray-400 group-hover:${job.hoverColor} transition-colors`}
                        />
                        {job.location}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <FaClock
                          className={`mr-2 text-gray-400 group-hover:${job.hoverColor} transition-colors`}
                        />
                        {job.posted}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <FaRupeeSign
                          className={`mr-2 text-gray-400 group-hover:${job.hoverColor} transition-colors`}
                        />
                        {job.salary}
                      </div>
                    </div>

                    <button
                      className={`apply-button w-full bg-gradient-to-r ${job.buttonGradient} text-white font-semibold py-3 rounded-xl transition-all relative overflow-hidden group hover:scale-[1.03] active:scale-[0.97]`}
                      onClick={() => openJobModal(job)}
                    >
                      <span className="relative z-10">Apply Now</span>
                      <span className="absolute inset-0 w-full h-full bg-white opacity-0 hover:opacity-20 transition-opacity" />
                    </button>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <FadeInSection delay={1} className="inline-block">
              <a
                href="/login"
                className="view-more inline-flex items-center bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full transition-all hover:scale-105 hover:translate-x-1"
              >
                View All Jobs
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 lg:px-32 bg-gradient-to-b from-purple-950 to-pink-950"
      >
        <div className="container mx-auto px-4">
          <FadeInSection className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                Success Stories
              </span>
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2} className="w-full">
            <p className="text-xl text-center max-w-2xl mx-auto mb-16 text-gray-300">
              Hear from people who found their dream jobs through our platform.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "I found my dream job as a Senior Developer at a great company within just 2 weeks of using this platform. The job matching algorithm is truly impressive!",
                name: "Rahul Sharma",
                role: "Senior Developer",
                gradient: "from-purple-500 to-pink-500",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                quote:
                  "As a recent graduate, I was worried about finding a good job. This platform not only helped me land a great role but also provided valuable resources for interview preparation.",
                name: "Priya Patel",
                role: "UX Designer",
                gradient: "from-cyan-500 to-blue-500",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                quote:
                  "After struggling with job searches for months, I found three great offers within a week using this portal. The direct contact with employers made the process so much smoother.",
                name: "Arjun Mehta",
                role: "Product Manager",
                gradient: "from-amber-500 to-red-500",
                avatar: "https://randomuser.me/api/portraits/men/67.jpg",
              },
            ].map((testimonial, index) => (
              <FadeInSection
                key={index}
                delay={0.4 + index * 0.2}
                className="w-full"
              >
                <div
                  className={`testimonial-card bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 relative h-full group float-animation-${
                    index + 1
                  }`}
                >
                  <div
                    className={`absolute -top-5 left-8 bg-gradient-to-r ${testimonial.gradient} w-10 h-10 rounded-full flex items-center justify-center text-2xl hover:scale-110 hover:rotate-12 transition-transform`}
                  >
                    {'"'}
                  </div>
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${testimonial.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl`}
                  ></div>
                  <p className="text-gray-300 mb-8 pt-4 italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center">
                    {testimonial.avatar ? (
                      <div className="w-12 h-12 rounded-full mr-4 overflow-hidden border-2 border-white/20 group-hover:border-white/40  hover:scale-110 hover:rotate-6 transition-transform">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full mr-4 hover:scale-110 hover:rotate-6 transition-transform`}
                      ></div>
                    )}
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:px-32 bg-gradient-to-b from-pink-950 to-indigo-900 relative overflow-hidden">
        {/* Animated Floating Shapes */}
        <div className="floating-shapes absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`floating-shape absolute rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 float-animation-${
                (index % 3) + 1
              }`}
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                transform: `rotate(${Math.random() * 180}deg)`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4">
          <FadeInSection className="w-full">
            <div className="cta-card bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto relative overflow-hidden hover:shadow-2xl transition-shadow">
              {/* Dynamic Background */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <div
                  className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 moving-gradient"
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                ></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl blob-animation-1"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen filter blur-3xl blob-animation-2"></div>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
                Ready to Find Your Dream Job?
              </h2>
              <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-300 relative z-10">
                Join thousands of job seekers who have successfully found their
                perfect career match with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <button className="cta-btn-primary bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all relative overflow-hidden group hover:scale-105 active:scale-95">
                  <span className="relative z-10">Create Your Profile</span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                </button>
                <button className="cta-btn-secondary bg-white/10 hover:bg-white/20 border border-white/20 font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 active:scale-95">
                  Browse Jobs
                </button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20 lg:px-32 bg-gradient-to-b from-purple-950 to-pink-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="grid grid-cols-12 grid-rows-6 h-full">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="border-b border-r border-white/5"
              ></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4">
          <FadeInSection className="w-full">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                Your Career Dashboard
              </span>
            </h2>
          </FadeInSection>

          <FadeInSection delay={0.2} className="w-full">
            <p className="text-xl text-center max-w-2xl mx-auto mb-16 text-gray-300">
              Track your job applications, get personalized recommendations, and
              manage your career progress all in one place.
            </p>
          </FadeInSection>

          <div className="relative">
            <FadeInSection delay={0.4} className="w-full">
              <div className="bg-gradient-to-br from-gray-900/60 to-indigo-900/60 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
                <div className="grid grid-cols-12 h-[600px]">
                  {/* Dashboard Sidebar */}
                  <div className="col-span-12 md:col-span-3 lg:col-span-2 border-r border-white/10 bg-indigo-950/50 py-6 px-4">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center space-x-3 mb-10 px-2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-8 h-8 rounded-lg flex items-center justify-center">
                          <span className="font-bold text-xs">JP</span>
                        </div>
                        <div className="font-medium">Dashboard</div>
                      </div>

                      <nav className="space-y-1 flex-grow">
                        {[
                          {
                            label: "Overview",
                            active: true,
                            icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
                          },
                          {
                            label: "Applications",
                            active: false,
                            icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
                          },
                          {
                            label: "Messages",
                            active: false,
                            icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
                          },
                        ].map((item) => (
                          <a
                            key={item.label}
                            href="#"
                            className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                              item.active
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <svg
                              className="w-5 h-5 mr-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={item.icon}
                              />
                            </svg>
                            {item.label}
                          </a>
                        ))}
                      </nav>
                    </div>
                  </div>

                  {/* Dashboard Main Content */}
                  <div className="col-span-12 md:col-span-9 lg:col-span-10 p-8">
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-semibold">
                          Welcome back, John!
                        </h3>
                        <p className="text-gray-400">
                          Here{"'"}s what{"'"}s happening with your job search
                        </p>
                      </div>
                      <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-xl hover:scale-105 transition-transform">
                        Edit Profile
                      </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {[
                        { label: "Applications", value: "12", change: "+2" },
                        { label: "Profile Views", value: "245", change: "+15" },
                        {
                          label: "Interview Invites",
                          value: "3",
                          change: "+1",
                        },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-white/5 rounded-xl p-6 border border-white/10"
                        >
                          <p className="text-gray-400 mb-2">{stat.label}</p>
                          <div className="flex items-baseline">
                            <p className="text-2xl font-semibold">
                              {stat.value}
                            </p>
                            <span className="ml-2 text-green-400 text-sm">
                              {stat.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Applications */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 mb-8">
                      <h4 className="text-lg font-semibold mb-4">
                        Recent Applications
                      </h4>
                      <div className="space-y-4">
                        {[
                          {
                            company: "Microsoft",
                            role: "Senior Frontend Developer",
                            status: "In Review",
                          },
                          {
                            company: "Amazon",
                            role: "Data Scientist",
                            status: "Interview Scheduled",
                          },
                          {
                            company: "Google",
                            role: "Product Manager",
                            status: "Application Sent",
                          },
                        ].map((app) => (
                          <div
                            key={app.role}
                            className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                          >
                            <div>
                              <p className="font-medium">{app.role}</p>
                              <p className="text-sm text-gray-400">
                                {app.company}
                              </p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-sm bg-white/10">
                              {app.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Job Recommendations */}
                    <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold mb-4">
                        Recommended Jobs
                      </h4>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Full Stack Developer",
                            company: "TechCorp",
                            match: "95%",
                          },
                          {
                            title: "UI/UX Designer",
                            company: "DesignHub",
                            match: "92%",
                          },
                          {
                            title: "DevOps Engineer",
                            company: "CloudTech",
                            match: "88%",
                          },
                        ].map((job) => (
                          <div
                            key={job.title}
                            className="flex items-center justify-between py-3 border-b border-white/10 last:border-0"
                          >
                            <div>
                              <p className="font-medium">{job.title}</p>
                              <p className="text-sm text-gray-400">
                                {job.company}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-green-400 text-sm">
                                {job.match} Match
                              </span>
                              <button className="block mt-1 text-sm text-cyan-400 hover:text-cyan-300">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-b lg:px-32 from-pink-950 to-indigo-950 relative overflow-hidden">
        {/* Newsletter Subscription */}
        <FadeInSection
          delay={0.6}
          className="mt-16 flex justify-center items-center"
        >
          <div className="bg-white/5  w-max backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter for the latest job opportunities and
              career tips.
            </p>
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-6 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all relative overflow-hidden group hover:scale-105 active:scale-95">
                <span className="relative z-10">Subscribe</span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <FadeInSection delay={0.2} className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-lg">
                  <span className="font-bold text-xl">Job</span>
                  <span className="font-light">Portal</span>
                </div>
              </div>
              <p className="text-gray-400">
                Your trusted partner in finding the perfect career opportunity.
                Connect with top employers and advance your professional
                journey.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: FaFacebook, href: "#" },
                  { icon: FaTwitter, href: "#" },
                  { icon: FaLinkedin, href: "#" },
                  { icon: FaInstagram, href: "#" },
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all group"
                    >
                      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </FadeInSection>

            {/* Quick Links */}
            <FadeInSection delay={0.3} className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: "About Us", href: "#" },
                  { label: "How It Works", href: "#" },
                  { label: "Pricing", href: "#" },
                  { label: "Blog", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Contact", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeInSection>

            {/* For Job Seekers */}
            <FadeInSection delay={0.4} className="space-y-4">
              <h3 className="text-lg font-semibold">For Job Seekers</h3>
              <ul className="space-y-2">
                {[
                  { label: "Create Profile", href: "/signup" },
                  { label: "Job Alerts", href: "#" },
                  { label: "Career Resources", href: "#" },
                  { label: "Interview Tips", href: "#" },
                  { label: "Resume Builder", href: "#" },
                  { label: "Salary Guide", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-1 h-1 bg-purple-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeInSection>

            {/* For Employers */}
            <FadeInSection delay={0.5} className="space-y-4">
              <h3 className="text-lg font-semibold">For Employers</h3>
              <ul className="space-y-2">
                {[
                  { label: "Post a Job", href: "#" },
                  { label: "Talent Search", href: "#" },
                  { label: "Recruitment Tools", href: "#" },
                  { label: "Pricing Plans", href: "#" },
                  { label: "Success Stories", href: "#" },
                  { label: "Employer Guide", href: "#" },
                ].map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <span className="w-1 h-1 bg-pink-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </FadeInSection>
          </div>

          {/* Bottom Bar */}
        </div>
        <div
          // delay={0.5}
          className="mt-16 p-8 border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Job Portal. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <div
        ref={backToTopRef}
        className={`fixed right-6 bottom-6 z-50 transition-transform duration-300 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 p-3 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-shadow group"
        >
          <svg
            className="h-6 w-6 group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
