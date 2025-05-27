const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(endpoint, { method = "GET", body, headers = {} } = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    credentials: "include", // Important for cookies
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      } else {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }
    }

    if (response.status !== 204) {
      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        return await response.json();
      } else {
        const text = await response.text();
        console.warn("Response was not JSON:", text);
        return { message: text };
      }
    }
    return null;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
}

const api = {
  async get(endpoint, headers = {}) {
    return request(endpoint, { method: "GET", headers });
  },
  async post(endpoint, body, headers = {}) {
    return request(endpoint, { method: "POST", body, headers });
  },
  async put(endpoint, body, headers = {}) {
    return request(endpoint, { method: "PUT", body, headers });
  },
  async delete(endpoint,body, headers = {}) {
    return request(endpoint, { method: "DELETE",body,headers });
  }
};

export default api;
