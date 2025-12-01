import React from 'react';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Header/Header';
import { useNavigate } from 'react-router';


const ErrorPage = () => {


    const navigate = useNavigate();
    return (
        <>
            <title>404 Not Found - IE Hub</title>
            <div className='flex flex-col mx-auto min-h-screen'>
                <Navbar></Navbar>
                <div className='flex-1'>

                    <div className="min-h-screen flex items-center justify-center p-4">
                        <div className="text-center">
                            {/* Icon */}
                            <div className="flex justify-center mb-8">
                                <svg
                                    className="w-40 h-40 text-indigo-400 animate-bounce"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                    />
                                </svg>
                            </div>

                            {/* 404 Text */}
                            <h1 className="text-9xl font-bold text-white mb-4 text-">404</h1>
                            <p className="text-2xl text-gray-300 mb-8">Page Not Found</p>

                            {/* Button */}
                            <button
                                onClick={() => navigate('/')}
                                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>

                </div>
                <Footer></Footer>
            </div>

        </ >
    );
};

export default ErrorPage;