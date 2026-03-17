export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/private"],
    },
    sitemap: "https://abcinstitute.org/sitemap.xml",
  };
}
