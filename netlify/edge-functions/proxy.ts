export default async (request: Request) => {
  try {
    const targetHost = 'https://remy-jsonbin.glitch.me'; // Change to your target host URL

    // Construct the new URL by replacing the original host with the target host
    const newUrl = new URL(request.url);
    newUrl.hostname = new URL(targetHost).hostname;
    newUrl.protocol = 'https:';
    newUrl.port = '';

    console.log('request', newUrl.toString(), request.method, request.headers);

    // remove all headers starting with x- to avoid conflicts
    const headers = new Headers(request.headers);
    for (const key of headers.keys()) {
      if (key.startsWith('x-') || key.startsWith('sec-')) {
        headers.delete(key);
      }
    }

    // Fetch the data from the new URL with the original request method and headers
    return fetch(newUrl.toString(), {
      method: request.method,
      headers: request.headers,
      redirect: 'manual',
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
};
