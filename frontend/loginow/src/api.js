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