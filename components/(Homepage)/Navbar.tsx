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
  Info, // Changed from ShoppingBag to Info for "About Us"
  MoreHorizontal,
  Phone,
} from "lucide-react"; // Note: Ensure lucide-react is installed
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const Items = [
    { name: "Classroom Courses", href: "#", icon: <GraduationCap size={20} /> },
    { name: "Online Courses", href: "#", icon: <LayoutDashboard size={20} /> },
    { name: "Test Series", href: "#", icon: <BookOpen size={20} /> },
    {
      name: "Results",
      href: "/result-2025",
      icon: <ClipboardList size={20} />,
    },
    { name: "About Us", href: "/about-us", icon: <Info size={20} /> },
    { name: "Blog", href: "/blog", icon: <MoreHorizontal size={20} /> },
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* --- Logo Section (Made bigger and clearer) --- */}
            <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
              <div
                className="relative w-12 h-12 sm:w-14 sm:h-14 overflow-hidden rounded-xl"
                onClick={() => router.push("/")}
              >
                <Image
                  src="/logo.jpeg"
                  alt="ABC Institute Logo"
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  priority
                />
              </div>
              <div className="hidden sm:block leading-tight"></div>
            </div>

            {/* --- Desktop Menu --- */}
            <ul className="hidden lg:flex items-center gap-6 text-nowrap">
              {Items.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 text-[14px] font-semibold text-gray-600 hover:text-blue-600 transition-all duration-200"
                  >
                    {/* Icon is optional here, keeping text clean for desktop */}
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* --- Right Side Actions --- */}
            <div className="hidden lg:flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-blue-600 transition">
                <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                  <Phone size={18} />
                </div>
                +91 9897511632
              </button>
              <a
                href="#"
                className="px-7 py-3 rounded-full bg-blue-600 text-white text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all active:translate-y-0"
              >
                Login
              </a>
            </div>

            {/* --- Mobile Header Controls --- */}
            <div className="lg:hidden flex items-center gap-4">
              <a
                href="#"
                className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100"
              >
                Login
              </a>
              <button
                onClick={() => setOpen(true)}
                className="p-2 text-gray-800 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Open Menu"
              >
                <Menu size={24} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY --- */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      <div
        className={`fixed inset-y-0 right-0 z-[70] w-[280px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={32}
                height={32}
                className="rounded"
              />
              <span className="font-bold text-gray-900">Navigation</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full bg-gray-50 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {Items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-4 py-4 rounded-xl text-gray-700 font-bold hover:bg-blue-50 hover:text-blue-600 transition-all group"
                >
                  <span className="p-2 bg-gray-50 text-gray-500 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                    {item.icon}
                  </span>
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <button className="flex items-center justify-center gap-2 w-full mb-3 text-gray-700 font-bold text-sm">
              <Phone size={16} /> +91 9897511632
            </button>
            <a
              href="#"
              className="flex items-center justify-center w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition active:scale-95"
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
