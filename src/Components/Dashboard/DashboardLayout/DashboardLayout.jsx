import { NavLink, Outlet } from 'react-router';
import { Droplet, Heart, Users } from 'lucide-react';
import { MdDashboard } from 'react-icons/md';
import { CgAddR, CgProfile } from 'react-icons/cg';
import Footer from '../../Footer/Footer';
import Navbar from '../../Header/Header';
import { TbPackageExport, TbPackageImport } from 'react-icons/tb';

const DashboardLayout = () => {


    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className="flex py-5 bg-gray-50">
                {/* Sidebar */}
                <aside className="lg:w-64 w-15 bg-white border-r border-gray-200 flex flex-col">

                    {/* Navigation */}
                    <nav className="flex-1 p-2 md:p-3 lg:p-4">
                        <ul className="space-y-2">
                            <li><NavLink to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"><MdDashboard className='h-5 w-5'></MdDashboard><span className='hidden lg:inline md:inline'>Dashboard</span></NavLink></li>
                            <li><NavLink to="myimports" className="flex items-center gap-3 px-4 py-3  hover:bg-red-50 hover:text-indigo-900 rounded-lg transition-colors duration-200"><TbPackageImport className='h-5 w-5'></TbPackageImport><span className='hidden lg:inline md:inline'>My Imports</span></NavLink></li>
                            <li> <NavLink to="myexports" className="flex items-center gap-3 px-4 py-3  hover:bg-red-50 hover:text-indigo-900 rounded-lg transition-colors duration-200" > <TbPackageExport className='h-5 w-5' /> <span className='hidden lg:inline md:inline'>My Exports</span> </NavLink> </li>
                            <li> <NavLink to="addtoexport" className="flex items-center gap-3 px-4 py-3  hover:bg-red-50 hover:text-indigo-900 rounded-lg transition-colors duration-200" > <CgAddR className='h-5 w-5' /> <span className='hidden lg:inline md:inline'>Add New Exports</span> </NavLink> </li>
                            <li><NavLink to="profile" className="flex items-center gap-3 px-4 py-3  hover:bg-red-50 hover:text-indigo-900 rounded-lg transition-colors duration-200"><CgProfile className='h-5 w-5'></CgProfile><span className='hidden lg:inline md:inline'>Profile</span></NavLink></li>



                        </ul>
                    </nav>


                </aside>

                <main className='flex-1'>
                    <Outlet></Outlet>
                </main>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;