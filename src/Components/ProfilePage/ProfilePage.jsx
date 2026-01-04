import React, { useContext } from 'react';
import { ImportExportHubContext } from '../../../Contexts/importExportHubContext';

const ProfilePage = () => {
    const { user } = useContext(ImportExportHubContext)
    return (
        <div className="min-h-screen bg-gray-50 py-6 md:py-8 lg:py-12 px-3 md:px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">


                {/* Profile Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header Background */}
                    <div className="h-24 md:h-28 lg:h-32 bg-gradient-to-r from-indigo-900 to-indigo-700"></div>

                    {/* Profile Content */}
                    <div className="relative px-4 md:px-6 lg:px-8 pb-6 md:pb-8">

                        <div className="flex justify-center -mt-12 md:-mt-14 lg:-mt-16 mb-3 md:mb-4">
                            <div className="relative">
                                <img
                                    src={user.photoURL}
                                    alt={user.name}
                                    className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />

                            </div>
                        </div>

                        <div className="text-center mb-6 md:mb-8">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-indigo-900 mb-1 md:mb-2">{user.displayName}</h2>
                            <p className="text-sm md:text-base text-gray-600 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-indigo-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="break-all">{user.email}</span>
                            </p>
                        </div>

                        {/* Profile Details Section */}
                        <div className="space-y-3 md:space-y-4">
                            <div className="border-t border-gray-200 pt-4 md:pt-6">
                                <h3 className="text-base md:text-lg lg:text-xl font-semibold text-indigo-900 mb-3 md:mb-4">Profile Information</h3>

                                {/* Name Field */}
                                <div className="mb-3 md:mb-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <p className="text-indigo-900 font-semibold text-base md:text-lg lg:text-xl">{user.displayName}</p>
                                </div>

                                {/* Email Field */}
                                <div className="mb-3 md:mb-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <p className="text-indigo-900 font-semibold text-base md:text-lg lg:text-xl break-all">{user.email}</p>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ProfilePage;