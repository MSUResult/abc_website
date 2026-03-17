"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "../(Homepage)/Navbar";

const NavbarProvider = () => {
  const pathname = usePathname();

  if (!pathname) return null;
  if (pathname.startsWith("/admin")) return null;

  return <Navbar />;
};

export default NavbarProvider;
