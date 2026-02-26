"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import {
  Menu,
  X,
  GraduationCap,
  BookOpen,
  LayoutDashboard,
  ClipboardList,
  Info,
  MoreHorizontal,
  Phone,
  ChevronRight,
  ChevronDown, // Added for the accordion
} from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileResultsOpen, setMobileResultsOpen] = useState(false); // New state for mobile toggle
  const router = useRouter();

  const Items = [
    {
      name: "Classroom Courses",
      href: "/courses",
      icon: <GraduationCap size={20} />,
    },
    {
      name: "Scholarship",
      href: "/scholarship",
      icon: <LayoutDashboard size={20} />,
      status: "new",
    },
    { name: "Test Series", href: "/test-series", icon: <BookOpen size={20} /> },
    {
      name: "Results",
      href: "#",
      icon: <ClipboardList size={20} />,
      status: "upcoming",
    },
    { name: "About Us", href: "/about-us", icon: <Info size={20} /> },
    {
      name: "Blog",
      href: "/blog",
      icon: <MoreHorizontal size={20} />,
      status: "new",
    },
  ];

  const RenderBadge = ({ status }) => {
    if (status === "new") {
      return (
        <span className="ml-1.5 flex h-4 items-center px-1.5 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 uppercase tracking-wider relative overflow-hidden">
          <span className="absolute inset-0 bg-emerald-400/20 animate-pulse" />
          <span className="relative">New</span>
        </span>
      );
    }
    if (status === "upcoming") {
      return (
        <span className="ml-1.5 flex h-4 items-center px-1.5 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold border border-amber-100 uppercase tracking-wider">
          Soon
        </span>
      );
    }
    return null;
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
              onClick={() => router.push("/")}
            >
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-xl bg-gray-50 border border-gray-100 shadow-inner">
                <Image
                  src="/logo.jpeg"
                  alt="Logo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Desktop Menu - (UNTOUCHED) */}
            <ul className="hidden lg:flex items-center gap-8">
              {Items.map((item, index) => {
                const isResult = item.name === "Results";
                return (
                  <li
                    key={index}
                    className="relative"
                    onMouseEnter={() => isResult && setIsHovered(true)}
                    onMouseLeave={() => isResult && setIsHovered(false)}
                  >
                    <div className="relative py-7">
                      <a
                        href={item.href}
                        className="flex items-center text-[14px] font-bold text-gray-500 hover:text-blue-600 transition-colors duration-200 group relative"
                      >
                        {item.name}
                        <RenderBadge status={item.status} />
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                      </a>
                      <AnimatePresence>
                        {isResult && isHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute top-full left-[-20px] w-60 p-2 bg-white rounded-2xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                          >
                            {[
                              { label: "NEET Results", path: "/result-2025" },
                              {
                                label: "JEE Results",
                                path: "/jee/results-2026",
                              },
                            ].map((subItem) => (
                              <button
                                key={subItem.label}
                                onClick={() => router.push(subItem.path)}
                                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group/item"
                              >
                                {subItem.label}
                                <ChevronRight
                                  size={14}
                                  className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all"
                                />
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="flex items-center gap-3 text-sm font-bold text-gray-700 group">
                <div className="p-2.5 bg-blue-50 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Phone size={18} />
                </div>
                <span>+91 9897511632</span>
              </button>
              <a
                href="#"
                className="px-8 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all"
              >
                Login
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setOpen(true)}
                className="p-2 text-gray-800 bg-gray-100 rounded-lg"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed inset-y-0 right-0 z-[70] w-[320px] bg-white transform transition-transform duration-500 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <span className="font-extrabold text-xl text-gray-900">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {Items.map((item, index) => {
                const isResult = item.name === "Results";

                return (
                  <div key={index} className="overflow-hidden">
                    {/* Main Item Link */}
                    <button
                      onClick={() => {
                        if (isResult) {
                          setMobileResultsOpen(!mobileResultsOpen);
                        } else {
                          router.push(item.href);
                          setOpen(false);
                        }
                      }}
                      className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl font-bold transition-all ${
                        isResult && mobileResultsOpen
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className={`p-2 rounded-xl transition-colors ${
                            isResult && mobileResultsOpen
                              ? "bg-blue-600 text-white"
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          {item.icon}
                        </span>
                        {item.name}
                      </div>

                      <div className="flex items-center gap-2">
                        <RenderBadge status={item.status} />
                        {isResult && (
                          <ChevronDown
                            size={18}
                            className={`transition-transform duration-300 ${mobileResultsOpen ? "rotate-180" : ""}`}
                          />
                        )}
                      </div>
                    </button>

                    {/* Mobile Sub-menu Accordion */}
                    {isResult && (
                      <AnimatePresence>
                        {mobileResultsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="ml-14 mt-1 space-y-1 border-l-2 border-blue-100"
                          >
                            {[
                              { label: "NEET Results", path: "/results/neet" },
                              {
                                label: "JEE Results",
                                path: "/jee/results-2026",
                              },
                            ].map((sub) => (
                              <button
                                key={sub.label}
                                onClick={() => {
                                  router.push(sub.path);
                                  setOpen(false);
                                }}
                                className="block w-full text-left px-4 py-3 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors"
                              >
                                {sub.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Mobile Footer Action */}
          <div className="p-6 border-t border-gray-50 bg-gray-50/50">
            <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100">
              Login / Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
