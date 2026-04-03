"use client";
import React, { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  phone: z.string().min(10, "Phone number must be at least 10 digits"),

  email: z.string().email("Invalid email address"),

  message: z.string().min(5, "Message must be at least 5 characters"),
});

const ContactPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const result = formSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.format());
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const response = await res.json();
      console.log(response);

      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  // Framer motion variants for the "up from down" animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 py-12 mt-12 overflow-hidden">
      {/* Main Contact Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="bg-white max-w-5xl mx-auto w-full shadow-lg rounded-2xl p-8 md:p-12 border-t-4 border-t-red-600"
      >
        {/* Centered Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Get in Touch
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            If you have any questions, feel free to write to us. Our team will
            respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT SIDE: FORM */}
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 00000 00000"
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full font-bold px-6 py-3 rounded-lg transition-all shadow-md 
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed shadow-none"
                    : "bg-red-600 hover:bg-red-700 text-white shadow-red-200 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: INFO CARDS */}
          <div className="flex flex-col space-y-4">
            {/* Phone Card */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-red-200 hover:shadow-md transition-all group">
              <div className="bg-red-50 p-3 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Phone
                </h4>
                <p className="text-gray-600">+91 9897511632</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-red-200 hover:shadow-md transition-all group">
              <div className="bg-red-50 p-3 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Email
                </h4>
                <p className="text-gray-600">abcinstitute@gmail.com</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-red-200 hover:shadow-md transition-all group">
              <div className="bg-red-50 p-3 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Address
                </h4>
                <p className="text-gray-600">Parsvnath Plaza, Saharanpur, UP</p>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mt-4 hover:border-red-200 transition-all group">
              <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-600" /> Business Hours
              </h4>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="font-medium text-gray-800">Mon - Fri:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between items-center border-b border-gray-50 pb-2">
                  <span className="font-medium text-gray-800">Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </p>
                <p className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">Sunday:</span>
                  <span className="text-red-500 font-medium">Closed</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* MAP SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="max-w-5xl w-full mx-auto mt-8 shadow-lg rounded-2xl overflow-hidden bg-white p-2 border-t-4 border-t-red-600"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.6703554627116!2d77.54581177626993!3d29.97310062194917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ee928fdfd4cc9%3A0xc3ab53ab5478d1eb!2sParsvnath%20Plaza!5e0!3m2!1sen!2sin!4v1709424851234!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0, borderRadius: "0.75rem" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </motion.section>
    </main>
  );
};

export default ContactPage;
