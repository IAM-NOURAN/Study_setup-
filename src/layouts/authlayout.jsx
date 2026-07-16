import React from 'react';
import { Outlet, Link,Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AuthLayout() {
  const { isLoggedIn } = useAuth();

 
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
   
      <style>{`
       
        .auth-layout-wrapper {
          min-height: 100vh;
          position: relative;
          background-color: var(--surface); 
        }

      
        .back-to-home-btn {
          position: absolute;
          top: 16px; 
          left: 16px;
          text-decoration: none;
          
         
          font-family: var(--font-body);
          font-size: 0.78rem; 
          font-weight: 500;
          letter-spacing: 0.5px;
          padding: 6px 12px; 
          border-radius: 6px; 
          
     
          color: var(--on-surface-variant); 
          background-color: var(--surface-container-low); 
          border: 1px solid var(--surface-container-highest); 
          
          transition: all 0.2s ease-in-out;
          z-index: 10; 
        }

       
        .back-to-home-btn:hover {
          background-color: var(--surface-container); 
          color: var(--primary); 
          border-color: var(--secondary-container); 
          transform: translateY(-1px); 
          box-shadow: 0 4px 12px rgba(28, 27, 25, 0.03); 
        }

     
        .back-to-home-btn span.material-symbols-outlined {
          font-size: 1.05rem !important;
          vertical-align: middle;
        }
      `}</style>

      
      <div className="auth-layout-wrapper">
        
        <Link to="/" className="back-to-home-btn d-inline-flex align-items-center gap-1">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>

      
        <main className="auth-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default AuthLayout;

