'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow-sm">
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
                </div>
            </div>
        </nav>
    );
} 