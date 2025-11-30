import React from 'react';

const NewsLetter = () => {
    return (
        <div className='bg-indigo-900 py-12 mt-5 lg:w-7xl rounded-2xl'>
            <div className='max-w-2xl mx-auto text-center px-5'>
                <h2 className='text-2xl font-bold text-white mb-3'>
                    Stay updated with our latest products and sales
                </h2>
                <p className='text-gray-300 mb-6'>
                    Join our news latter
                </p>

                <div className='flex gap-2'>
                    <input
                        type="email"
                        placeholder="Your email"
                        className='flex-1 px-4 py-3 rounded-lg input'
                    />
                    <button className='px-6 py-2 bg-white text-indigo-900 font-semibold rounded-lg'>
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;