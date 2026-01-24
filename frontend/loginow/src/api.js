const backendUrl = 'http://localhost:3000';

export async function checkHealth() {
    try {
        const res = await fetch(`${backendUrl}/api/health`);
        const data = await res.json();
        console.log('Health Check:', data);
    }catch (err){
        console.log('Connection fail:', err.message);
    }
}

export async function registerUser(formData) {
  try {
    const response = await fetch(`${backendUrl}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Registration failed");
    }

    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message || "Something went wrong" };
  }
}

export async function loginUser(formData) {
  try {
    console.log('API: Sending login request to:', `${backendUrl}/api/login`);
    console.log('API: Login data:', { username: formData.username, password: '***' });

    const response = await fetch(`${backendUrl}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // Important: receives the refresh token cookie
      body: JSON.stringify({
        username: formData.username,
        password: formData.password
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || "Login failed");
    }

    return { ok: true, data };
  } catch (err) {
    console.error('API: Login error:', err);
    if (err.name === 'AbortError') {
      return { ok: false, error: 'Request timeout - server not responding' };
    }
    return { ok: false, error: err.message || "Something went wrong" };
  }
}

export async function logoutUser() {
  try {
    const response = await fetch(`${backendUrl}/api/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // Important: sends the refresh token cookie
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Logout failed");
    }

    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message || "Something went wrong" };
  }
}

export async function refreshAccessToken() {
  try {
    const response = await fetch(`${backendUrl}/api/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: 'include', // Sends the refresh token cookie automatically
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Token refresh failed");
    }

    return { ok: true, data };
  } catch (err) {
    return { ok: false, error: err.message || "Token refresh failed" };
  }
}


export async function apiRequest(url, options = {}) {
  return fetch(`${backendUrl}${url}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
}