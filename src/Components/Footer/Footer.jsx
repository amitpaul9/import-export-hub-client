import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaSquareFacebook, FaSquarePinterest, FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-indigo-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-6">

                    <div>
                        <h3 className="text-white text-base font-semibold mb-3">Contact</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                                <Mail size={16} />
                                <a href="mailto:contact@example.com" className="hover:text-indigo-400">
                                    IE@Hub.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone size={16} />
                                <span>+8801111111111</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin size={16} />
                                <span>Dhaka, Bangladesh</span>
                            </div>
                        </div>
                    </div>


                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-white text-base font-semibold mb-3">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com" className="hover:text-indigo-400 transition-colors" aria-label="Facebook">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.x.com/" className="hover:text-indigo-400 transition-colors" aria-label="Twitter">
                                <FaXTwitter size={20} />
                            </a>
                            <a href="https://www.instagram.com/" className="hover:text-indigo-400 transition-colors" aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.linkedin.com/" className="hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://www.github.com/" className="hover:text-indigo-400 transition-colors" aria-label="Github">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>


                    <div>
                        <h3 className="text-white text-base font-semibold mb-3">About</h3>
                        <p className="text-sm">
                            Creating exceptional experiences for our customers worldwide.
                        </p>
                    </div>
                </div>


                <div className="border-t border-gray-700 pt-4 text-center text-sm">
                    <p>© 2025 IE Hub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;