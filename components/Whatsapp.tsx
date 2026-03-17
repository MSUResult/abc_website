import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappFloat = () => {
  const phoneNumber = "919897511632"; // 👉 change to your number

  const message = "Hello i want to know more about ABC Institute";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg animate-bounce hover:scale-110 transition"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsappFloat;
