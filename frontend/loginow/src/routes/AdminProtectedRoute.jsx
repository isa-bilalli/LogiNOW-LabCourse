import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { verifyAdminStatus } from "../api.js";
import { useState, useEffect } from "react";

export default function AdminProtectedRoute() {
  const { isAuthenticated, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAdminStatus() {
      if (!isAuthenticated) {
        setIsChecking(false);
        return;
      }

      // Shiko objektin lokal user per verifikim
      const localAdminCheck = user?.role === 2 || user?.roleID === 2;
      
      // Verifiko ne backend
      const result = await verifyAdminStatus();
      const backendAdminCheck = result.ok && result.isAdmin;

      // Nese i kapercen te dy testet useri, atehere setIsAdmin
      setIsAdmin(localAdminCheck && backendAdminCheck);
      setIsChecking(false);
    }

    checkAdminStatus();
  }, [isAuthenticated, user]);

  // loading screen duke testuar.
  if (isChecking) {
    return (
      <div className="flex min-h-screen bg-gray-100 items-center justify-center">
        <div className="text-2xl text-gray-600">Verifying access...</div>
      </div>
    );
  }

  // redirect ne login nese nuk eshte autentifikuar
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect ne dashboard nese nuk eshte admin
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Rendero admin route nese kapercehen te gjitha
  return <Outlet />;
}

