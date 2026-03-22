import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are public (Guests can see these)
const isPublicRoute = createRouteMatcher([
  '/',                          // Home page
  '/test-series(.*)',           // All test list and quiz pages
  '/login(.*)',               // Clerk sign-in (if you build it)
  '/register(.*)',               // Clerk sign-up (if you build it)
]);

export default clerkMiddleware((auth, request) => {
  // If the route is NOT public, protect it (require login)
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};