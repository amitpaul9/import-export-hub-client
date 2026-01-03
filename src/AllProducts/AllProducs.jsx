import React, { useContext, useEffect, useState } from 'react';
import { ImportExportHubContext } from '../../Contexts/importExportHubContext';
import { Link } from 'react-router';
import InfiniteScroll from "react-infinite-scroll-component";

const AllProducs = () => {
    const [products, setProducts] = useState([]);
    const { setLoader, loader } = useContext(ImportExportHubContext);
    const [search, setSearch] = useState("")
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const ITEMS_PER_PAGE = 8;
    const [sortBy, setSortBy] = useState("");




    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
        // Reset infinite scroll when searching
        setCurrentIndex(0);
        setHasMore(true);
    }

    let filteredProducts = products.filter(product => product.productName?.toLowerCase().includes(search.toLowerCase()))

    if (sortBy === "price-low") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-low") {
        filteredProducts = [...filteredProducts].sort((a, b) => a.rating - b.rating);
    } else if (sortBy === "rating-high") {
        filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
    }

    const handleSort = (e) => {
        setSortBy(e.target.value);

        setCurrentIndex(0);
        setHasMore(true);
    }


    useEffect(() => {
        setLoader(true);
        fetch('https://import-export-hub-server-lake.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setDisplayedProducts(data.slice(0, ITEMS_PER_PAGE));
                setCurrentIndex(ITEMS_PER_PAGE);
                setHasMore(data.length > ITEMS_PER_PAGE);
                setLoader(false)

            })
    }, [])


    // Load initial products when filtered products change
    useEffect(() => {
        setDisplayedProducts(filteredProducts.slice(0, ITEMS_PER_PAGE));
        setCurrentIndex(ITEMS_PER_PAGE);
        setHasMore(filteredProducts.length > ITEMS_PER_PAGE);
    }, [search, sortBy]);




    const fetchMoreData = () => {
        if (currentIndex >= filteredProducts.length) {
            setHasMore(false);
            return;
        }


        setTimeout(() => {
            const nextProducts = filteredProducts.slice(currentIndex, currentIndex + ITEMS_PER_PAGE);
            setDisplayedProducts(prev => [...prev, ...nextProducts]);
            setCurrentIndex(prev => prev + ITEMS_PER_PAGE);

            if (currentIndex + ITEMS_PER_PAGE >= filteredProducts.length) {
                setHasMore(false);
            }
        }, 500);
    };




    // loader is made with AI
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
        <div className='mx-auto flex flex-col items-center' >
            <title>All Products - IE Hub</title>
            <h1 className='text-2xl text-indigo-900 font-bold mt-5 underline'>All Available Products</h1>
            <div className='flex  items-center justify-between lg:px-[150px] w-full '>
                <div> <select
                    onChange={handleSort}
                    value={sortBy}
                    className="select select-bordered w-full max-w-xs"
                >
                    <option value="">Sort By</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating-low">Rating: Low to High</option>
                    <option value="rating-high">Rating: High to Low</option>
                </select></div>

                <div>
                    <label className="input">
                        <svg className="lg:h-[1em] h-1 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input onChange={handleSearch} type="search" required placeholder="Search" />
                    </label>
                </div>


            </div>


            <InfiniteScroll
                dataLength={displayedProducts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                    <div className="flex justify-center items-center py-4">
                        <div className="flex space-x-1">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-2 h-6 bg-[#1a237e] rounded-full"
                                    style={{
                                        animation: 'wave 1s ease-in-out infinite',
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                }
                endMessage={
                    <p className="text-center py-4 text-indigo-900 font-semibold">
                        You've seen all products!
                    </p>
                }
            >
                <div className='grid grid-cols-1 mb-8 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-5 '>
                    {displayedProducts.length > 0 ? (displayedProducts.map(product => <div key={product._id} className=" card bg-base-100 w-90 md:w-96 lg:w-96 shadow-sm transition-all duration-300 hover:scale-105 hover:bg-indigo-900 hover:text-white cursor-pointer">
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
                    </div>)) : <h1 className='text-xl text-center text-red-600'>No product Available</h1>}
                </div>
            </InfiniteScroll>



        </div >
    );
};

export default AllProducs;