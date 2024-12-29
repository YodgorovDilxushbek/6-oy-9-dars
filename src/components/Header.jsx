import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className='flex items-center justify-between p-5 bg-base-200 text-lg pl-20 pr-20'>
            <div className='logo'>
                <a className='bg-blue-500 text-white rounded-md p-4 text-2xl' href="#">C</a>
            </div>
            <nav className='flex items-center gap-8'>
                <Link className="hover:bg-base-300 px-4 py-2 rounded-md" to='/'>Home</Link>
                <Link className="hover:bg-base-300 px-4 py-2 rounded-md" to='/Product'>Product</Link>
                <Link className="hover:bg-base-300 px-4 py-2 rounded-md" to='/Cart'>Cart</Link>
            </nav>
            <div className="flex items-center gap-3">
                <button className="btn btn-ghost" onClick={toggleTheme}>
                    {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </button>
            </div>
        </header>
    );
}

export default Header;
