import React, { createContext, useState, useContext } from 'react';

// 1. إنشاء الكونتكست (مستودع البيانات المشترك)
const AuthContext = createContext();

// 2. الموفر (Provider) الذي يغلف التطبيق ويوزع الـ state
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // القيمة الافتراضية غير مسجل دخول
  const [user, setUser] = useState(null);

  // دالة لتسجيل الدخول
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  // دالة لتسجيل الخروج
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook مخصص لتسهيل جلب البيانات في أي مكان بالبرنامج
export function useAuth() {
  return useContext(AuthContext);
}