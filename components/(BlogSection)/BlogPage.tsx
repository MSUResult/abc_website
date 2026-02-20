import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const BlogPage = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-xl font-medium text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDFDFD] antialiased">
      {/* HERO SECTION */}
      <header className="relative w-full bg-primary overflow-hidden py-32 px-6">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -left-[10%] w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-red-400 uppercase bg-red-400/10 border border-red-400/20 rounded-full">
            {data.tag || "Education"}
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-8">
            {data.title}
          </h1>

          <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
            <span className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-orange-400" />
              By Editorial Team
            </span>
            <span className="w-1 h-1 bg-gray-600 rounded-full" />
            <span>5 min read</span>
          </div>
        </div>
      </header>

      {/* ARTICLE CONTENT */}
      <div className="max-w-7xl mx-auto -mt-16 px-6 pb-32 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <article className="bg-white rounded-[2rem] p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-50">
            <div className="prose prose-slate prose-lg max-w-none">
              {data.content.map((item, index) => {
                if (item.type === "heading") {
                  return (
                    <h2
                      key={index}
                      className="text-3xl font-bold text-slate-800 mt-12 mb-6 tracking-tight"
                    >
                      {item.text}
                    </h2>
                  );
                }

                if (item.type === "text") {
                  return (
                    <p
                      key={index}
                      className="text-gray-600 leading-8 mb-6 text-[1.1rem]"
                    >
                      {item.text}
                    </p>
                  );
                }

                if (item.type === "image") {
                  return (
                    <figure key={index} className="my-10 group">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="rounded-2xl w-full shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                      {item.alt && (
                        <figcaption className="text-center text-sm text-gray-400 mt-4 italic">
                          {item.alt}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                if (item.type === "qa") {
                  return (
                    <div
                      key={index}
                      className="relative my-10 pl-8 border-l-4 border-red-500 bg-red-50/30 p-8 rounded-r-2xl"
                    >
                      <div className="absolute -left-3 top-8 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                        ?
                      </div>
                      <p className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                        {item.question}
                      </p>
                      <p className="text-gray-700 leading-relaxed italic">
                        "{item.answer}"
                      </p>
                    </div>
                  );
                }

                return null;
              })}
            </div>

            {/* FOOTER OF ARTICLE */}
            <div className="mt-16 pt-10 border-t border-gray-100 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                {["#Design", "#React", "#Web"].map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-medium text-gray-400 hover:text-red-500 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.instagram.com/`}
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 text-white hover:scale-110 transition"
                >
                  <FaInstagram />
                </a>

                <a
                  href={`https://www.facebook.com/`}
                  target="_blank"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white hover:scale-110 transition"
                >
                  <FaFacebookF />
                </a>
              </div>
            </div>
          </article>
        </div>
        <aside className="space-y-6">
          {/* Ad Box */}
          <div className="bg-white p-6 rounded-2xl shadow border">
            <p className="text-sm text-gray-400 mb-2">Sponsored</p>

            {/* Paste Ad Here */}
            <div className="bg-gray-100 h-64 flex items-center justify-center rounded-xl">
              Your Ad Here
            </div>
          </div>

          {/* Sticky CTA */}
          <div className="bg-red-50 p-6 rounded-2xl border border-red-100 sticky top-10">
            <h3 className="text-lg font-bold text-red-600 mb-2">
              Join Our Course
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Crack JEE / NEET with top mentors
            </p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full">
              Enroll Now
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default BlogPage;
