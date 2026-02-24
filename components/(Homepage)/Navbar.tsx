"use client";

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
} from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const Items = [
    {
      name: "Classroom Courses",
      href: "/courses",
      icon: <GraduationCap size={20} />,
    },
    {
      name: "Scholarship",
      href: "/courses",
      icon: <LayoutDashboard size={20} />,
      status: "new", // Changed to a status string for cleaner logic
    },
    { name: "Test Series", href: "#", icon: <BookOpen size={20} /> },
    {
      name: "Results",
      href: "/result-2025",
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

  // Helper to render the badge
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
                  alt="ABC Institute Logo"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority
                />
              </div>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-8">
              {Items.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center text-[14px] font-bold text-gray-500 hover:text-blue-600 transition-colors duration-200 group relative py-2"
                  >
                    {item.name}
                    <RenderBadge status={item.status} />
                    {/* Hover Underline Effect */}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="flex items-center gap-3 text-sm font-bold text-gray-700 group">
                <div className="p-2.5 bg-blue-50 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Phone size={18} />
                </div>
                <span className="group-hover:text-blue-600 transition-colors">
                  +91 9897511632
                </span>
              </button>
              <a
                href="#"
                className="px-8 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 hover:-translate-y-0.5 transition-all active:translate-y-0"
              >
                Login
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-3">
              <a
                href="#"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-100"
              >
                Login
              </a>
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

      {/* MOBILE DRAWER (Fixed badges here too) */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed inset-y-0 right-0 z-[70] w-[300px] bg-white transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <span className="font-extrabold text-xl text-gray-900 tracking-tight">
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {Items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-4 py-4 rounded-2xl text-gray-700 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <span className="p-2 bg-gray-50 text-gray-400 rounded-xl group-hover:bg-white group-hover:text-blue-600 shadow-sm transition-all">
                      {item.icon}
                    </span>
                    {item.name}
                  </div>
                  <RenderBadge status={item.status} />
                </a>
              ))}
            </nav>
          </div>

          <div className="p-6 bg-gray-50/50 space-y-4">
            <div className="flex items-center justify-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 font-bold text-gray-600">
              <Phone size={18} className="text-blue-600" /> +91 9897511632
            </div>
            <a
              href="#"
              className="flex items-center justify-center w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
