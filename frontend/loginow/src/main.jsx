import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import ProtectedRoute from './routes/ProtectedRoutes.jsx'

//Landing Page eshte gjithmone e kerkuar ne hapje te aplikacionit, te tjeret jane faqe sekondare dhe nuk duhen menjehere.

import LandingPage from './pages/LandingPage.jsx';
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const FindFreight = lazy(() => import('./pages/FindFreight.jsx'));
const PostFreight = lazy(() => import('./pages/PostFreight.jsx'))
const FindTruck = lazy(() => import('./pages/FindTruck.jsx'));
const PostTruck = lazy(() => import('./pages/PostTruck.jsx'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword.jsx'));
const MyAccount = lazy(() => import('./pages/myAccount.jsx'));
const ErrorPage = lazy(() => import('./pages/ErrorPage.jsx'));

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
    <Suspense>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  </StrictMode>,
)
