import React, { useContext, useRef, useEffect, useState } from 'react';
import { ImportExportHubContext } from '../../../Contexts/importExportHubContext';
import { FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ProfilePage = () => {
    const { user } = useContext(ImportExportHubContext)
    const [mongoUser, setMongoUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const profileRef = useRef(null);

    // Fetch MongoDB user data
    useEffect(() => {
        if (user?.email) {
            fetch(`https://import-export-hub-server-lake.vercel.app/users?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log('MongoDB user:', data);
                    if (data && data._id) {
                        setMongoUser(data);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleImportModal = () => {
        profileRef.current.showModal();
    }

    // Fix aria-hidden issue
    useEffect(() => {
        const modal = profileRef.current;

        const handleOpen = () => {
            const root = document.getElementById('root');
            if (root) {
                root.removeAttribute('aria-hidden');
            }
        };

        const handleClose = () => {
            const root = document.getElementById('root');
            if (root) {
                root.setAttribute('aria-hidden', 'false');
            }
        };

        if (modal) {
            modal.addEventListener('open', handleOpen);
            modal.addEventListener('close', handleClose);
        }

        return () => {
            if (modal) {
                modal.removeEventListener('open', handleOpen);
                modal.removeEventListener('close', handleClose);
            }
        };
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const name = e.target.name.value;
        const image = e.target.image.value;

        try {
            if (!mongoUser || !mongoUser._id) {
                Swal.fire("Error!", "User not found in database.", "error");
                return;
            }

            const updatedData = {
                email: email,
                name: name,
                image: image
            }

            // Update using the _id
            const response = await fetch(`https://import-export-hub-server-lake.vercel.app/users/${mongoUser._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();
            console.log('Update response:', data);

            if (data.modifiedCount > 0) {
                // Update local mongoUser state
                setMongoUser({
                    ...mongoUser,
                    name: name,
                    email: email,
                    image: image
                });

                Swal.fire("Updated!", "Profile updated successfully.", "success");
                profileRef.current.close();
            } else if (data.matchedCount > 0) {
                Swal.fire("Info", "No changes were made (data is the same)", "info");
            } else {
                Swal.fire("Error!", "Failed to update profile", "error");
            }
        } catch (err) {
            console.error('Error:', err);
            Swal.fire("Error!", "Failed to update profile: " + err.message, "error");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-indigo-900"></span>
            </div>
        );
    }

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
                                    src={mongoUser?.image || user?.photoURL || 'https://via.placeholder.com/150'}
                                    alt={mongoUser?.name || user?.displayName}
                                    className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                            </div>
                        </div>

                        <div className="text-center mb-6 md:mb-8">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-indigo-900 mb-1 md:mb-2">
                                {mongoUser?.name || user?.displayName}
                            </h2>
                            <p className="text-sm md:text-base text-gray-600 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-indigo-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="break-all">{mongoUser?.email || user?.email}</span>
                            </p>
                        </div>

                        {/* Profile Details Section */}
                        <div className="space-y-3 md:space-y-4">
                            <div className="border-t border-gray-200 pt-4 md:pt-6">
                                <h3 className="text-base md:text-lg lg:text-xl font-semibold text-indigo-900 mb-3 md:mb-4">Profile Information</h3>

                                {/* Name Field */}
                                <div className="mb-3 md:mb-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <p className="text-indigo-900 font-semibold text-base md:text-lg lg:text-xl">
                                        {mongoUser?.name || user?.displayName}
                                    </p>
                                </div>

                                {/* Email Field */}
                                <div className="mb-3 md:mb-4 p-3 md:p-4 bg-gray-50 rounded-lg">
                                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <p className="text-indigo-900 font-semibold text-base md:text-lg lg:text-xl break-all">
                                        {mongoUser?.email || user?.email}
                                    </p>
                                </div>
                            </div>

                            {/* Edit Button */}
                            <div className='flex justify-center'>
                                <button onClick={handleImportModal} className="btn">
                                    <FaRegEdit />Edit
                                </button>
                            </div>

                            {/* Modal */}
                            <dialog className="modal modal-bottom sm:modal-middle" ref={profileRef}>
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg text-center">Update Profile</h3>
                                    <div className='flex justify-end'>
                                        <button
                                            type="button"
                                            className='btn btn-xs'
                                            onClick={() => profileRef.current.close()}
                                        >
                                            ❌
                                        </button>
                                    </div>

                                    <div className="modal-action flex flex-row justify-center">
                                        <form onSubmit={handleProfileUpdate} className="w-full">
                                            <fieldset className="fieldset rounded-box w-full p-4">

                                                <label className="label">Photo URL</label>
                                                <input
                                                    type="url"
                                                    className="input w-full border"
                                                    name='image'
                                                    defaultValue={mongoUser?.image || user?.photoURL}
                                                    required
                                                />

                                                <label className="label">Name</label>
                                                <input
                                                    type="text"
                                                    className="input w-full border"
                                                    name='name'
                                                    defaultValue={mongoUser?.name || user?.displayName}
                                                    required
                                                />

                                                <label className="label">Email</label>
                                                <input
                                                    type="email"
                                                    className="input w-full border"
                                                    name='email'
                                                    defaultValue={mongoUser?.email || user?.email}
                                                    readOnly
                                                />

                                                <button
                                                    type="submit"
                                                    className="mt-3 btn text-white bg-gradient-to-r from-gray-900 to-indigo-900 w-full"
                                                >
                                                    Update
                                                </button>

                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;