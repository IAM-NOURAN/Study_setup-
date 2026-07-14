import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import pages and layouts
import Home from './pages/home.jsx';
import Tasks from './pages/tasks.jsx';
import Profile from './pages/Profile.jsx';
import FocusSession from './pages/FocusSession.jsx';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NotFound from "./pages/NotFound.jsx"; 
import AuthLayout from './layouts/AuthLayout.jsx'; 
import MainLayout from './layouts/MainLayout.jsx';
import './App.css'




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  
      const router = createBrowserRouter([
           {
               path: "/",
               element: <AuthLayout />,
               children: [
               { path: "login", element: <Login /> },
               { path: "signup", element: <Signup /> }
            ]
           },
          {
             path: "",
             element: <MainLayout />, 
             children: [
             { index: true, element: <Home /> }, 
             { path: "/tasks", element: <Tasks /> },
             { path: "/profile", element: <Profile /> },
             { path: "/focus-session", element: <FocusSession /> },
             { path: "*", element: <NotFound /> } 
           ]
            }
             ]);

     return (
      <>
      
      <RouterProvider router={router} />
      </>
  
        
      );
}

export default App; 
