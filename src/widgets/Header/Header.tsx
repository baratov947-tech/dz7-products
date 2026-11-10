import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    className="text-xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight hover:opacity-90 transition-opacity"
                >
                    StoreApp
                </Link>
                <nav className="hidden md:flex gap-8 items-center">
                    <Link
                        to="/"
                        className={`text-sm font-semibold transition-colors ${
                            isActive('/') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                        }`}
                    >
                        Каталог
                    </Link>
                    <Link
                        to="/favorites"
                        className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                            isActive('/favorites') ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'
                        }`}
                    >
                        <span>❤️</span> Избранное
                    </Link>
                </nav>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
                    aria-label="Toggle menu"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
                    <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                            isActive('/') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        Каталог
                    </Link>
                    <Link
                        to="/favorites"
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                            isActive('/favorites') ? 'bg-indigo-50 text-indigo-600' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        ❤️ Избранное
                    </Link>
                </div>
            )}
        </header>
    );
};