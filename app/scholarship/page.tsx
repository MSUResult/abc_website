import React from "react";

const page = () => {
  return (
    <div className="min-h-screen mt-22 bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="relative py-20 bg-blue-700 text-white text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {/* Subtle background pattern or image can go here */}
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            The ABC Institute Scholarship 2026
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Empowering the bright minds of Saharanpur to lead the future of
            technology and innovation.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content Side */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-blue-800 border-b-4 border-yellow-400 inline-block">
              Why We Support Saharanpur
            </h2>
            <p className="text-lg leading-relaxed text-slate-600">
              At **ABC Institute**, we believe that talent is universal, but
              opportunity is not. Our roots are deep in Saharanpur, and we
              recognize the immense potential within our local student
              community. From the busy streets of Court Road to the quiet
              suburbs, we are looking for the next generation of web developers
              and leaders.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-md border-l-8 border-blue-600">
              <h3 className="font-bold text-xl mb-2 italic text-blue-700">
                "Your background doesn't define your future—your dedication
                does."
              </h3>
              <p className="text-slate-500">— Director, ABC Institute</p>
            </div>
          </section>

          {/* Image Placeholder Side */}
          <section className="relative group">
            {/* Replace the src with your actual image path */}
            <div className="w-full h-96 bg-slate-200 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
              <img
                src="/sholorship.jpeg"
                alt="ABC Institute Saharanpur Students"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-18 -left-8 bg-yellow-400 p-6 rounded-2xl shadow-lg hidden md:block">
              <p className="font-black text-3xl">Up to 100%</p>
              <p className="font-semibold uppercase tracking-wider">
                Fee Waiver
              </p>
            </div>
          </section>
        </div>

        {/* Scholarship Details Grid */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors">
            <div className="text-blue-600 mb-4 text-3xl">🎯</div>
            <h3 className="text-xl font-bold mb-3">Eligibility</h3>
            <p className="text-slate-600">
              Open to all students in Saharanpur district pursuing technical
              certifications or degrees.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors">
            <div className="text-blue-600 mb-4 text-3xl">📝</div>
            <h3 className="text-xl font-bold mb-3">Assessment</h3>
            <p className="text-slate-600">
              A logic and aptitude-based test followed by a personal interview
              at our Saharanpur campus.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-colors">
            <div className="text-blue-600 mb-4 text-3xl">📅</div>
            <h3 className="text-xl font-bold mb-3">Deadline</h3>
            <p className="text-slate-600">
              Applications are open until the end of this month. Don't miss your
              chance!
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center bg-slate-900 text-white p-12 rounded-[3rem]">
          <h2 className="text-3xl font-bold mb-6">
            Ready to start your journey?
          </h2>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl">
            Apply Now for Scholarship
          </button>
          <p className="mt-4 text-slate-400">
            Questions? Visit us at our center in Saharanpur.
          </p>
        </section>
      </main>
    </div>
  );
};

export default page;
