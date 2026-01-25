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
  const [accessToken, setAccessToken] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('accessToken') || null;
  });
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated
  const isAuthenticated = !!accessToken && !!user;

  // Save to localStorage whenever token or user changes
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Initialize: Try to restore session on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    try {
      // If we already have a token from localStorage, verify it
      const storedToken = localStorage.getItem('accessToken');
      if (storedToken) {
        // Try to fetch user info to verify token is still valid
        await fetchUserInfo(storedToken);
        setIsLoading(false);
        return;
      }

      // Otherwise try to refresh token on app load
      const result = await refreshAccessToken();
      if (result.ok && result.data && result.data.accessToken) {
        setAccessToken(result.data.accessToken);
        await fetchUserInfo(result.data.accessToken);
      } else {
        setAccessToken(null);
        setUser(null);
      }
    } catch (error) {
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
        // Token will be saved to localStorage by useEffect
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
      await logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear state and localStorage
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
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