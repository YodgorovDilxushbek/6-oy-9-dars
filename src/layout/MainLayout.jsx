import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


function MainLayout({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="bg-pink-500 w-10 h-10 flex items-center justify-center rounded-lg">
            <span className="text-blue-500 font-bold text-xl">C</span>
          </div>
        </div>
        <div className="navbar-center">
        <li><Link className="hover:bg-black py-3 px-4 rounded-md" to="/">Home</Link></li>
            <li><Link className="hover:bg-black py-3 px-4 rounded-md" to="/about">About</Link></li>
            <li><Link className="hover:bg-black py-3 px-4 rounded-md" to="/products">Products</Link></li>
            <li><Link className="hover:bg-black py-3 px-4 rounded-md" to="/cart">Cart</Link></li>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default MainLayout;
