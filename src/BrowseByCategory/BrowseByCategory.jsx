import React from 'react';

const BrowseByCategory = () => {
    return (
        <div className='py-16 px-5 border border-gray-100 bg-[#1a237e05] lg:w-7xl rounded-2xl'>
            <div className='max-w-6xl mx-auto'>
                <h2 className='text-3xl font-bold text-center text-indigo-900 mb-10'>
                    Browse by Category
                </h2>

                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all cursor-pointer'>
                        <div className='text-4xl mb-3'>📱</div>
                        <h3 className='font-bold text-indigo-900'>Electronics</h3>
                        <p className='text-sm text-gray-600'>120 Products</p>
                    </div>

                    <div className='bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all cursor-pointer'>
                        <div className='text-4xl mb-3'>👕</div>
                        <h3 className='font-bold text-indigo-900'>Clothing</h3>
                        <p className='text-sm text-gray-600'>85 Products</p>
                    </div>

                    <div className='bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all cursor-pointer'>
                        <div className='text-4xl mb-3'>🍔</div>
                        <h3 className='font-bold text-indigo-900'>Food</h3>
                        <p className='text-sm text-gray-600'>95 Products</p>
                    </div>

                    <div className='bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all cursor-pointer'>
                        <div className='text-4xl mb-3'>🪑</div>
                        <h3 className='font-bold text-indigo-900'>Furniture</h3>
                        <p className='text-sm text-gray-600'>60 Products</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowseByCategory;