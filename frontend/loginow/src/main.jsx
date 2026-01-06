import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
// import ProtectedRoute from './routes/ProtectedRoutes.jsx' Heqi // pasi te implementojme autentifikimin & back-endin
import LandingPage from './pages/landingPage.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import FindFreight from './pages/findFreight.jsx'
import PostFreight from './pages/postFreight.jsx'
import FindTruck from './pages/findTruck.jsx'
import PostTruck from './pages/postTruck.jsx'
import myAccount from './pages/myAccount.jsx'

const router = createBrowserRouter([
  {path: '/', element: <LandingPage />},
  {path: '/login', element: <Login />},
  {path: '/register', element: <Register />},
  {path: '/dashboard', element: <Dashboard />},
  {path: '/findfreight', element: <FindFreight />},
  {path: '/postfreight', element: <PostFreight />},
  {path: '/findtruck', element: <FindTruck />},
  {path: '/posttruck', element: <PostTruck />},
  {path: '/myaccount', element: <myAccount />},
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
