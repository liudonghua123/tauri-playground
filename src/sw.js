self.addEventListener('install', event => {
  console.log('Service worker installed');
});

self.addEventListener('activate', event => {
  console.log('Service worker activated');
});

self.addEventListener('fetch', event => {
  event.respondWith(handleRequest(event)); // Pass handleRequest directly to respondWith
});

async function handleRequest(event) {
  try {
    let request = event.request.clone();
    const url = new URL(request.url);
    
    // Get the extension of the last part of the pathname
    const extension = url.pathname.includes('.') ? url.pathname.split('.').pop() : '';
    
    // Check if the URL starts with `/assets` and doesn't end with `/`, `.js`, or `.css`
    if (url.pathname.startsWith(`/assets`) && !url.pathname.endsWith('/') && !['js', 'css'].includes(extension)) {
      console.info(`Rewrite url: ${url.href} to ${url.href}.js`);
      
      // The request URL is immutable, so we need to create a new Request object with the modified URL
      request = new Request(`${url.href}.js`, {
        method: request.method,
        headers: request.headers,
        body: request.body, // Only use body if the method supports it (e.g., POST, PUT)
        mode: request.mode,
        credentials: request.credentials,
        cache: request.cache,
        redirect: request.redirect,
        referrer: request.referrer,
        referrerPolicy: request.referrerPolicy,
        integrity: request.integrity,
        keepalive: request.keepalive,
      });
    }

    // Check if the response for the request is already in the cache
    const cache = await caches.open('assets-cache');
    let response = await cache.match(request.url);
    if (!response) {
      console.info(`Cache miss for ${request.url}`);
      response = await fetch(request);
      const responseClone = response.clone(); // Clone the response to put it into the cache
      event.waitUntil(cache.put(request.url, responseClone));
    }

    return response; // Immediately return the response (or the cached response)
  } catch (error) {
    console.error(`Error in handleRequest: ${error}`);
    
    // Return a default response if an error occurs, to avoid interruption
    return new Response('Error fetching resource', { status: 500 });
  }
}
