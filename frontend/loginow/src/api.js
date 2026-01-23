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