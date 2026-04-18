const BACKEND_URL = "https://backend-production-1776.up.railway.app";

exports.handler = async (event) => {
  // Extract the path after /.netlify/functions/api, then prepend /api for backend
  const path = event.path.replace("/.netlify/functions/api", "");
  const url = `${BACKEND_URL}/api${path}`;

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        ...event.headers,
        "Content-Type": "application/json",
      },
      body: event.body,
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
