import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import ProtectedRoute from './routes/ProtectedRoutes.jsx' Heqi // pasi te implementojme autentifikimin & back-endin
import LandingPage from './pages/LandingPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import FindFreight from './pages/findFreight.jsx';
import PostFreight from './pages/postFreight.jsx';
import FindTruck from './pages/findTruck.jsx';
import PostTruck from './pages/postTruck.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import MyAccount from './pages/MyAccount.jsx';

const router = createBrowserRouter([
  {path: '/', element: <LandingPage />},
  {path: '/login', element: <Login />},
  {path: '/register', element: <Register />},
  {path: '/dashboard', element: <Dashboard />},
  {path: '/findfreight', element: <FindFreight />},
  {path: '/postfreight', element: <PostFreight />},
  {path: '/findtruck', element: <FindTruck />},
  {path: '/posttruck', element: <PostTruck />},
  {path: '/forgotpassword', element: <ForgotPassword />},
  {path: '/myaccount', element: <MyAccount />},
]);

/* Router me routes te mbrojtura masi te implementojme back-endin dhe autentifikimin
const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  {
    element: <ProtectedRoute />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/findfreight", element: <FindFreight /> },
      { path: "/postfreight", element: <PostFreight /> },
      { path: "/findtruck", element: <FindTruck /> },
      { path: "/posttruck", element: <PostTruck /> },
      { path: "/myaccount", element: <myAccount /> },
    ],
  },
]);
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
