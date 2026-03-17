import data from "@/data/course.json";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";

// --- SEO GENERATION ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = data.find((item) => item.slug === slug);

  return {
    title: course?.seoTitle || "Course Details | ABC Institute",
    description:
      course?.seoDescription || "Expert coaching for NEET and Board exams.",
    openGraph: {
      title: course?.Heading,
      description: course?.seoDescription,
      images: [course?.why?.[0]?.img || "/og-image.jpg"],
    },
  };
}

const CourseDetail = ({ params }) => {
  const resolvedParams = use(params);
  const currentSlug = resolvedParams.slug;

  const course = data.find(
    (item) =>
      item.slug?.trim().toLowerCase() === currentSlug?.trim().toLowerCase(),
  );

  if (!course) {
    console.log("URL Slug:", currentSlug);
    console.log("Found Course:", course ? "YES" : "NO");
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-32 pb-20">
        <h1 className="text-4xl font-black text-gray-900 mb-4">
          Course Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          The course you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/courses"
          className="bg-red-600 hover:bg-red-700 transition-colors text-white px-8 py-3 rounded-xl font-bold shadow-lg"
        >
          View All Courses
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fafafa] pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-800 via-red-900 to-black text-white pt-32 pb-24 px-4 shadow-lg relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/grid-pattern.svg')]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            href="/courses"
            className="inline-flex items-center text-red-200 hover:text-white mb-8 transition-all group font-medium"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">
              ←
            </span>
            Back to Course Catalog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
              {course.type} BATCH
            </span>
            <span className="bg-yellow-400 text-yellow-950 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
              Batch: {course.batch}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.15] tracking-tight max-w-4xl">
            {course.Heading}
          </h1>
          <p className="text-lg md:text-xl text-red-50/80 max-w-2xl leading-relaxed font-medium">
            {course.content}
          </p>
        </div>
      </div>

      {/* Main Content Area - Added relative z-20 to fix overlap issues */}
      <div className="max-w-6xl mx-auto px-4 relative z-20 -mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Stats Bar - Redesigned for perfect mobile/desktop alignment */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Level", value: course.class },
              { label: "Duration", value: course.Duration },
              { label: "Language", value: course.Language },
              { label: "Format", value: course.Batches },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center"
              >
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p className="text-gray-900 font-bold text-sm md:text-base">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Key Highlights / Features */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-black mb-8 text-gray-900 flex items-center gap-3">
              <span className="w-6 h-1 bg-red-600 rounded-full"></span>
              Why join this batch?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {course.features?.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-red-50/50 hover:border-red-100 border border-transparent transition-all"
                >
                  <div className="bg-green-100 p-1.5 rounded-full shrink-0">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 font-semibold text-sm leading-snug pt-0.5">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sticky Sidebar Group */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            {/* Enrollment Card */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="mb-6">
                <p className="text-xs font-black text-red-600 uppercase tracking-[0.2em] mb-2">
                  Enrollment Open
                </p>
                <h3 className="text-2xl font-black text-gray-900">
                  Secure Your Spot
                </h3>
              </div>

              <div className="space-y-4 mb-8 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-3">
                  <span className="text-gray-500 font-semibold">
                    Starting Date
                  </span>
                  <span className="text-gray-900 font-black text-right">
                    {course.starting_from}
                  </span>
                </div>
                <div className="flex flex-col gap-1 pt-1 text-sm">
                  <span className="text-gray-500 font-semibold">
                    Eligibility
                  </span>
                  <span className="text-gray-900 font-bold leading-tight">
                    {course.eligibility}
                  </span>
                </div>
              </div>

              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl shadow-lg shadow-red-600/20 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide">
                ENROLL NOW
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-5 font-bold uppercase tracking-widest">
                Limited Seats Available
              </p>
            </div>

            {/* Success Story Sidebar */}
            {course.why && course.why.length > 0 && (
              <div className="bg-gray-900 p-8 rounded-3xl text-white shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-3xl rounded-full"></div>
                <h4 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-6 text-center">
                  Inspirational Result
                </h4>

                {course.why.map((student, i) => (
                  <div key={i} className="text-center relative z-10">
                    <div className="relative w-24 h-24 mx-auto mb-5">
                      <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse opacity-20 scale-110"></div>
                      <div className="relative w-full h-full rounded-full border-4 border-gray-800 overflow-hidden bg-gray-800 shadow-inner">
                        <Image
                          src={student.img}
                          fill
                          alt={student.name}
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                    <h5 className="text-lg font-black mb-1">{student.name}</h5>
                    <p className="text-red-400 font-black text-xl mb-4 tracking-tight">
                      {student.Rank}
                    </p>
                    <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <p className="text-xs text-gray-300 leading-relaxed font-medium">
                        {student.info}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CourseDetail;
