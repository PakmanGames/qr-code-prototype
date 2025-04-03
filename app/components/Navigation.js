'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isMenuOpen]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-300">Hospital QR System</Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/form"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    pathname === '/form'
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors duration-300'
                                }`}
                            >
                                Patient Form
                            </Link>
                            <Link
                                href="/scanner"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    pathname === '/scanner'
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors duration-300'
                                }`}
                            >
                                QR Scanner
                            </Link>
                        </div>
                    </div>
                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6 transition-transform duration-200`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            {/* Close icon */}
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6 transition-transform duration-200`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div 
                className={`fixed inset-0 z-40 sm:hidden transition-opacity duration-300`}
                style={{ 
                    opacity: isVisible ? 1 : 0,
                    visibility: isVisible ? 'visible' : 'hidden'
                }}
            >
                {/* Overlay background */}
                <div 
                    className="fixed inset-0 bg-gray-600 transition-opacity duration-300 ease-in-out"
                    style={{ opacity: isMenuOpen ? 0.75 : 0 }}
                    onClick={closeMenu}
                ></div>
                
                {/* Mobile menu panel */}
                <div 
                    className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transition-transform duration-300 ease-in-out"
                    style={{
                        transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)'
                    }}
                >
                    <div className="h-full flex flex-col">
                        <div className="px-4 pt-5 pb-2">
                            <div className="flex items-center justify-between">
                                <div className="text-xl font-bold text-blue-600">Menu</div>
                                <button
                                    onClick={closeMenu}
                                    className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="mt-5 flex-grow px-2">
                            <nav className="px-2 space-y-1">
                                <Link
                                    href="/form"
                                    onClick={closeMenu}
                                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                                        pathname === '/form'
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    Patient Form
                                </Link>
                                <Link
                                    href="/scanner"
                                    onClick={closeMenu}
                                    className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                                        pathname === '/scanner'
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    QR Scanner
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
} 