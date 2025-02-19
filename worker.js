export default {
    async fetch(request, env, ctx) {
      try {
        const url = new URL(request.url);
  
        // Serve static assets from the dist folder
        const filePath = url.pathname === "/" ? "/index.html" : url.pathname;
        const assetUrl = new URL(`dist${filePath}`, import.meta.url);
  
        const response = await fetch(assetUrl);
  
        if (response.status === 404) {
          // If not found, serve index.html for client-side routing
          return await fetch(new URL(`dist/index.html`, import.meta.url));
        }
  
        return response;
      } catch (error) {
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    },
  };
  