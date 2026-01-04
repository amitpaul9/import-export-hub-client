
import { Link } from 'react-router';
import React, { useContext, useEffect, useState } from 'react';
import { ImportExportHubContext } from '../../Contexts/importExportHubContext';

const RecentProducts = () => {

    const [products, setProducts] = useState([]);
    const { setLoader, loader } = useContext(ImportExportHubContext);

    useEffect(() => {
        setLoader(true);
        fetch('https://import-export-hub-server-lake.vercel.app/products/recent')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoader(false)

            })
    }, [])

    //loader is made with AI
    if (loader) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                {/* Wave Loader */}
                <div className="flex justify-center items-center space-x-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-8 bg-[#1a237e] rounded-full"
                            style={{
                                animation: 'wave 1s ease-in-out infinite',
                                animationDelay: `${i * 0.1}s`
                            }}
                        ></div>
                    ))}
                </div>

                <p className="mt-4 text-[#1a237e] font-semibold text-lg">
                    Loading products...
                </p>

                <style>{`
                    @keyframes wave {
                        0%, 100% { height: 2rem; }
                        50% { height: 1rem; }
                    }
                `}</style>
            </div>
        );


    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-5'>

            {products.map(product => <div className=" card bg-base-100 w-90 md:w-96 lg:w-96 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-indigo-900 hover:text-white cursor-pointer">
                <figure>
                    <img className='h-[250px] w-[450px] p-3 rounded-2xl'
                        src={product.productImage}
                        alt="produc image" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{product.productName}</h2>
                    <div className='flex justify-between font-bold text-sm'>
                        <h3>Price: ${product.price}</h3>
                        <h3>Rating: {product.rating}</h3>
                    </div>
                    <div className='flex justify-between'>
                        <h3>Origin: {product.originCountry}</h3>
                        <h3>Available Quantity: {product.availableQuantity}</h3>
                    </div>
                    <div className="card-actions justify-end">
                        <Link to={`/products-details/${product._id}`} className='w-full border border-white text-center py-2 bg-indigo-900 text-white hover:bg-white hover:text-indigo-950 hover:transform-3d'>See Details</Link>
                    </div>
                </div>
            </div>)}
        </div>

    );
};

export default RecentProducts;