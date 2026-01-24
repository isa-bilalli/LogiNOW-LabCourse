import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, logoutUser, refreshAccessToken } from '../api.js';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = !!accessToken && !!user;

  // Initialize: Try to restore session on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    try {
      // Try to refresh token on app load (silently fail if no cookie exists)
      const result = await refreshAccessToken();
      if (result.ok && result.data && result.data.accessToken) {
        setAccessToken(result.data.accessToken);
        // Fetch user info with the new token
        await fetchUserInfo(result.data.accessToken);
      } else {
        // No valid session - this is normal if user hasn't logged in yet
        setAccessToken(null);
        setUser(null);
      }
    } catch (error) {
      // Silently fail - no session exists (normal on first load)
      setAccessToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchUserInfo(token) {
    try {
      const response = await fetch('http://localhost:3000/api/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token invalid, try to refresh
        const refreshed = await refreshAccessToken();
        if (refreshed.ok && refreshed.data.accessToken) {
          setAccessToken(refreshed.data.accessToken);
          // Retry fetching user info
          const retryResponse = await fetch('http://localhost:3000/api/me', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${refreshed.data.accessToken}`,
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          });
          if (retryResponse.ok) {
            const retryData = await retryResponse.json();
            setUser(retryData.user);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }

  async function login(username, password) {
    try {
      const result = await loginUser({ username, password });
      if (result.ok && result.data) {
        setAccessToken(result.data.accessToken);
        setUser(result.data.user);
        setIsLoading(false);
        // Refresh token is automatically stored in HttpOnly cookie by browser
        return { ok: true };
      } else {
        console.error('Login failed:', result.error);
        return { ok: false, error: result.error || 'Login failed' };
      }
    } catch (error) {
      console.error('Login exception:', error);
      return { ok: false, error: error.message || 'Login failed' };
    }
  }

  async function logout() {
    try {
      // Call logout API to revoke refresh token
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
      // Continue with logout even if API call fails
    } finally {
      // Clear local state regardless of API response
      setAccessToken(null);
      setUser(null);
      // Use window.location since AuthProvider is outside Router context
      window.location.href = '/login';
    }
  }

  async function refreshToken() {
    try {
      const result = await refreshAccessToken();
      if (result.ok && result.data.accessToken) {
        setAccessToken(result.data.accessToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  // Get current access token (for API calls)
  function getAccessToken() {
    return accessToken;
  }

  const value = {
    accessToken,
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    refreshToken,
    getAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

