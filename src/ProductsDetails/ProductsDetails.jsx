import React from 'react';
import { Link, useLoaderData } from 'react-router';

const ProductsDetails = () => {
    const product = useLoaderData();
    console.log(product);

    return (
        <div className='p-8 flex lg:flex-row md:flex-row flex-col gap-3 md:gap-5 lg:gap-12 '>
            <div>
                <img className='w-[800px] h-[400px]' src={product.productImage} alt="" />
            </div>
            <div className='w-full '>
                <h1 className='text-2xl mt-3 mb-2 font-bold'>{product.productName}</h1>
                <div className='bg-[#1a237e20] py-2 px-5 w-full rounded-lg'>
                    <h1 className='text-indigo-900 text-xl font-bold'>Product Details</h1>
                    <div className='text-left mt-2'>
                        <p className='  '>Price: ${product.price}</p>
                        <h3 className=''>Available Quantity: {product.availableQuantity}</h3>
                    </div>
                </div>
                <div className='bg-[#1a237e20] py-2 px-5 w-full rounded-lg mt-3'>

                    <div className='text-left mt-2'>
                        <p className='  '>Product ID: {product._id}</p>
                        <p className='  '>Origin: {product.originCountry}</p>
                        <h3 className=''>Created at: {product.createdDate}</h3>
                    </div>
                </div>

                <div className='mt-8 '>
                    <Link className='rounded-lg w-full px-5 py-2 text-white bg-gradient-to-r  from-gray-900 to-indigo-900'>Import Now</Link>
                </div>


            </div>
        </div>
    );
};

export default ProductsDetails;