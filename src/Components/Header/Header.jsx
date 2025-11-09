import React, { useContext } from 'react';
import { ImportExportHubContext } from '../../../Contexts/importExportHubContext';
import { Link, NavLink } from 'react-router';
import { FaShoppingBag } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';




const Navbar = () => {

  const { user, signOutUser } = useContext(ImportExportHubContext);


  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("Sign out Successfull"))
      .catch(error => console.log(error.message))
  }

  const links = [
    <li className='mr-4'><NavLink to="/">All Products</NavLink></li>,
    <li className='mr-4'><NavLink to='/'>My Exports</NavLink></li>,
    <li className='mr-4'><NavLink to="/profile">My Imports</NavLink></li>,
    <li className='mr-4'><NavLink to="/">Add Export</NavLink></li>
  ]

  return (
    <div className="navbar shadow-sm bg-white rounded-bl-2xl rounded-br-2xl p-5" >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link className=" text-xl" to="/"><div className=' flex justify-center items-center gap-2'><FaShoppingBag className='fill-[#F4CF89] w-12 h-12' /><h1 className='font-bold'>Import Export Hub</h1></div></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-[#344e41]">
          {links}
        </ul>
      </div>
      {user ? <div className='navbar-end'>

        {/* dropdown  */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className=" mr-5 border-2 border-[#F4CF89] rounded-full"><img className='h-12 w-12 rounded-full' src={user.photoURL} alt="" /></div>
          <ul tabIndex="-1" className="dropdown-content menu bg-[#F4CF89] font-bold rounded-box z-1 w-52 p-2 shadow-sm">
            <li><p><CgProfile /> {user.displayName}</p></li>
            <li><Link onClick={handleSignOut}><CiLogout /> Logout</Link></li>
          </ul>
        </div></div>
        : <div className="navbar-end ">
          <Link className="btn bg-[#344e41] text-white mr-2" to="/login">Login</Link>
          <Link className='btn border-2 border-[#344e41] bg-white' to="/register">Register</Link>
        </div>}
    </div>
  );
};

export default Navbar;