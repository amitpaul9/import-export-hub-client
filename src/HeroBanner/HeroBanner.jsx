import React from 'react';
import { GrSecure } from 'react-icons/gr';
import { MdSupportAgent } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { Link } from 'react-router';

const HeroBanner = () => {
    return (
        <div className='flex lg:flex-row flex-col-reverse gap-3 p-10  w-full justify-between '>
            <div className='mt-5'>
                <h1 className='font-extrabold text-3xl text-black'>Trade Globally, Grow Locall | Connect <br /> with verified suppliers & buyers </h1>
                <p className='mt-2 text-[#1a237e]'>"Expand your business globally. Find verified suppliers, reach new customers, trade with confidence."</p>
                <div className='flex gap-5 items-center pt-6'>
                    <Link to='/allproducts' className='btn rounded-4xl bg-gradient-to-r  from-gray-900 to-indigo-900 px-7 hover:bg-white hover:border-indigo-900 hover:text-white text-white '>Explore</Link>
                    <h3 className='btn rounded-4xl border-indigo-900 px-7 text-indigo-900 hover:bg-indigo-900 hover:text-white hover:border-none bg-white'>Learn More</h3>
                </div>
                <div className="divider mt-5"></div>
                <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-5  mt-9'>
                    <div className='flex flex-col items-center'>
                        <h1 className='text-4xl text-indigo-900 font-extrabold'>10k+</h1>
                        <h3 className='text-2xl text-[#1a237e80] font-bold '>Products</h3>
                    </div>
                    <div className='flex flex-col  items-center'>
                        <h1 className='text-4xl text-indigo-900 font-extrabold'>500+</h1>
                        <h3 className='text-2xl text-[#1a237e80] font-bold '>Countries</h3>
                    </div>
                    <div className='flex flex-col  items-center'>
                        <h1 className='text-4xl text-indigo-900 font-extrabold'>50+</h1>
                        <h3 className='text-2xl text-[#1a237e80] font-bold '>Categories</h3>
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 mt-5'>
                    <div className='flex items-center flex-col mt-9 '>
                        <div className=''><GrSecure size={30} /></div>
                        <h3 className='2xl font-bold'>Secured</h3>
                    </div>
                    <div className='flex items-center flex-col mt-9'>
                        <div className=''><VscWorkspaceTrusted size={30} /></div>
                        <h3 className='2xl font-bold'>Trusted</h3>
                    </div>
                    <div className='flex items-center flex-col mt-9'>
                        <div className=''><MdSupportAgent size={30} /></div>
                        <h3 className='2xl font-bold'>24/7 Support</h3>
                    </div>
                    <div className='flex items-center flex-col mt-9'>
                        <div className=''><TbTruckDelivery size={30} /></div>
                        <h3 className='2xl font-bold'>Fast Delivery</h3>
                    </div>
                </div>
            </div>
            <div className=' lg:w-[800px]'>
                <img className='rounded-2xl' src="/assets/hero-img.jpg" alt="" />
            </div>
        </div>
    );
};

export default HeroBanner;