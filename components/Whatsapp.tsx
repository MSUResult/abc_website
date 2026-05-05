"use client";

import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappFloat = () => {
  const [clicked, setClicked] = useState(false);

  const phoneNumber = "919897511632";

  const message =
    "Hello Sir, I found your website and I’m interested in learning more about ABC Institute.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    if (clicked) return;

    setClicked(true);

    // Open WhatsApp instantly
    window.open(whatsappLink, "_blank");

    // Background tracking
    fetch("/api/track-whatsapp", {
      method: "POST",
    }).catch(() => console.log("tracking failed"));

    // ✅ Reset after 30 seconds
    setTimeout(() => {
      setClicked(false);
    }, 30000); // 30,000 ms = 30 sec
  };

  return (
    <button
      onClick={handleClick}
      disabled={clicked}
      className={`fixed bottom-5 right-8 z-50 p-4 rounded-full shadow-lg transition
        ${clicked ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:scale-110"}
        text-white`}
    >
      <FaWhatsapp size={28} />
    </button>
  );
};

export default WhatsappFloat;