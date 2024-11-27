import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

console.log("Initializing route handler with ourFileRouter...");

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
});

console.log(
  "Route handler initialized successfully with GET and POST methods."
);
