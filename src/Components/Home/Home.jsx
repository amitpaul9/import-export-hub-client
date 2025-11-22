import React, { useContext, useEffect, useState } from 'react';
import { ImportExportHubContext } from '../../../Contexts/importExportHubContext';
import RecentProducts from '../../RecentProducts/RecentProducts';
import HeroBanner from '../../HeroBanner/HeroBanner';

const Home = () => {

    const [products, setProducts] = useState([]);
    const { setLoader } = useContext(ImportExportHubContext);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoader(false)
         
            })
    }, [])
    console.log(products)

    return (
        <>

            <div className='mx-auto flex flex-col items-center'>
                <HeroBanner></HeroBanner>
                <h1 className='text-center text-indigo-900 font-bold text-3xl mt-9 underline'>Recent Products</h1>
                <div className='grid grid-cols-3 gap-12 mt-4'>
                    {products?.map(product => <RecentProducts product={product}></RecentProducts>)}

                </div>
            </div>
        </>
    );
};

export default Home;