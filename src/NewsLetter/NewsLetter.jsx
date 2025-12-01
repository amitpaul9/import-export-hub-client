import React from 'react';

const NewsLetter = () => {
    return (
        <div className='bg-[#1a237e05] mb-8 border border-gray-100 py-12 mt-8 lg:w-7xl rounded-2xl'>
            <div className='max-w-2xl mx-auto text-center px-5'>
                <h2 className='text-2xl font-bold mb-3'>
                    Stay updated with our latest products and sales
                </h2>
                <p className='text-[#1a237e] mb-6'>
                    Join our news latter
                </p>

                <div className='flex gap-2'>
                    <input
                        type="email"
                        placeholder="Your email"
                        className='flex-1 px-4 py-3 rounded-lg input'
                    />
                    <button className='px-6 py-2 cursor-pointer text-white font-semibold rounded-lg bg-gradient-to-r  from-gray-900 to-indigo-900'>
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;