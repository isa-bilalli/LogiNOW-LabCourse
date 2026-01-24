import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FindFreight from './pages/FindFreight.jsx';
import PostFreight from './pages/PostFreight.jsx';
import FindTruck from './pages/FindTruck.jsx';
import PostTruck from './pages/PostTruck.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import MyAccount from './pages/MyAccount.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgotpassword", element: <ForgotPassword /> },
      
      // Protected routes - require authentication
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "findfreight", element: <FindFreight /> },
          { path: "postfreight", element: <PostFreight /> },
          { path: "findtruck", element: <FindTruck /> },
          { path: "posttruck", element: <PostTruck /> },
          { path: "myaccount", element: <MyAccount /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
