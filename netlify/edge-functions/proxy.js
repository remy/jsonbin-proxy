export default async (request, context) => {
  const targetHost = "https://remy-jsonbin.glitch.me"; // Change to your target host URL

  // Construct the new URL by replacing the original host with the target host
  const newUrl = new URL(request.url);
  newUrl.hostname = new URL(targetHost).hostname;

  // Fetch the data from the new URL with the original request method and headers
  const response = await fetch(newUrl.toString(), {
    method: request.method,
    headers: request.headers,
  });

  // Return the response from the target host
  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
};
