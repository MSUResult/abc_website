"use client"

import { usePathname } from "next/navigation"
import React from "react";
import Footer from "../(Homepage)/Footer";

const FooterProvider = () => {
    const pathname = usePathname()

    if(!pathname) return null;

    if(pathname.startsWith('/admin')) return null

    return <Footer />



}


export default FooterProvider;