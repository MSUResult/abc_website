"use client"
import React, { useState } from "react";
import React, { useState } from "react";
import {z} from 'zod'


const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name is too long"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  email: z
    .string()
    .email("Invalid email address"),

  message: z
    .string()
    .min(5, "Message must be at least 5 characters"),
});


const ContactPage = () => {

    const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return; // prevent double submit

  setLoading(true);

  const formData = new FormData(e.target);
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

    e.target.reset(); // reset form after success
  } catch (error) {
    console.log(error);
  }

  setLoading(false);
};



  return (
    // Changed bg-red-400 to bg-gray-50 for a clean, modern look
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 py-12 mt-12">
      
      {/* Main Contact Card */}
      <section className="bg-white max-w-5xl mx-auto w-full shadow-lg rounded-2xl p-8 md:p-12">
        
        {/* Centered Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Contact Us
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            If you have any questions, feel free to write to us. Our team will respond as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* LEFT SIDE: FORM */}
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    // Changed focus ring to match the red button theme
                    className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
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
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
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
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
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
  className={`w-full font-bold px-6 py-3 rounded-lg transition-colors shadow-md shadow-red-200
  ${loading 
    ? "bg-gray-400 cursor-not-allowed" 
    : "bg-red-600 hover:bg-red-700 text-white"}
  `}
>
  {loading ? "Sending..." : "Send Message"}
</button>
            </form>
          </div>

          {/* RIGHT SIDE: INFO */}
          <div className="flex flex-col space-y-8">
            
            {/* Contact Info Block */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900 min-w-[70px]">Phone:</span> 
                  +91 98975 11632
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900 min-w-[70px]">Email:</span> 
                  info@example.com
                </p>
                <p className="flex items-start gap-3">
                  <span className="font-semibold text-gray-900 min-w-[70px]">Address:</span> 
                  Parsvnath Plaza, <br/> Saharanpur, UP
                </p>
              </div>
            </div>

            {/* Business Hours Block */}
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-xl text-gray-900 mb-6">Business Hours</h3>
              <div className="space-y-3 text-gray-600">
                <p className="flex justify-between">
                  <span className="font-semibold text-gray-900">Monday - Friday:</span> 
                  9:00 AM - 6:00 PM
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold text-gray-900">Saturday:</span> 
                  10:00 AM - 4:00 PM
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold text-gray-900">Sunday:</span> 
                  Closed
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      <section className="max-w-5xl w-full mx-auto mt-8 shadow-lg rounded-2xl overflow-hidden bg-white p-2">
        {/* The iframe straight from Google Maps, styled to fit the container perfectly */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3460.6703554627116!2d77.54581177626993!3d29.97310062194917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ee928fdfd4cc9%3A0xc3ab53ab5478d1eb!2sParsvnath%20Plaza!5e0!3m2!1sen!2sin!4v1709424851234!5m2!1sen!2sin" 
          width="100%" 
          height="450" 
          style={{ border: 0, borderRadius: "0.75rem" }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        ></iframe>
      </section>

    </main>
  );
};

export default ContactPage;