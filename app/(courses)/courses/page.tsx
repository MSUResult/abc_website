import MainCourse from "@/components/(courses)/MainCourse";
import React from "react";

export const metadata = {
  title: "NEET & JEE Coaching in Saharanpur",
  description:
    "Join the best NEET and JEE coaching in Saharanpur at ABC Institute. Expert faculty, structured curriculum, affordable fees, and proven results.",

  alternates: {
    canonical: "https://yourwebsite.com/neet-jee-courses",
    languages: {
      "en-IN": "https://yourwebsite.com/neet-jee-courses",
      "hi-IN": "https://yourwebsite.com/hi/neet-jee-courses",
    },
  },

  openGraph: {
    title: "NEET & JEE Coaching in Saharanpur",
    description:
      "Affordable NEET and JEE preparation courses in Saharanpur with expert guidance.",
    images: [
      {
        url: "https://yourwebsite.com/abc4.avif",
        width: 1200,
        height: 630,
        alt: "NEET and JEE Coaching in Saharanpur",
      },
    ],
    url: "https://yourwebsite.com/neet-jee-courses",
    type: "website",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "ABC Institute",
    url: "https://yourwebsite.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Saharanpur",
      addressCountry: "India",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://yourwebsite.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Courses",
        item: "https://yourwebsite.com/courses",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "NEET & JEE",
        item: "https://yourwebsite.com/neet-jee-courses",
      },
    ],
  },
];

const page = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <MainCourse />
    </>
  );
};

export default page;
