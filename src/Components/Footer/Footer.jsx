import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaSquareFacebook, FaSquarePinterest } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="mt-5 footer footer-horizontal footer-center text-white rounded p-8 shadow-sm rounded-t-2xl bg-gradient-to-b from-gray-900 to-indigo-900 ">
            <nav className="grid grid-flow-col gap-4">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Privecy Policy</a>

            </nav>
            <nav>
                <div className="grid grid-flow-col gap-4">

                    <a ><AiFillInstagram className='h-7 w-7' /></a>
                    <a><FaSquareFacebook className='h-7 w-7' /> </a>
                    <a><FaSquarePinterest className='h-7 w-7' /></a>

                </div>
            </nav>
            <aside>
                <p>© {new Date().getFullYear()} - Import Export Hub. All rights reserved.</p>
            </aside>
        </footer>
    );
};

export default Footer;