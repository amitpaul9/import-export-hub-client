import React, { useContext } from 'react';
import { ImportExportHubContext } from '../../../Contexts/importExportHubContext';
import { Link, NavLink } from 'react-router';
import { FaShoppingBag } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';




const Navbar = () => {

  const { user, signOutUser, theme, toggleTheme } = useContext(ImportExportHubContext);

  console.log("theme", theme)
  console.log("toggle theme", toggleTheme)


  const handleSignOut = () => {
    signOutUser()
      .then(() => console.log("Sign out Successfull"))
      .catch(error => console.log(error.message))
  }

  const links = [
    <li className='mr-4 hover:transform-3d hover:text-indigo-900 lg:text-white  text-black '><NavLink to="/">Home</NavLink></li>,
    <li className='mr-4 hover:transform-3d hover:text-indigo-900 lg:text-white  text-black '><NavLink to="/allproducts">All Products</NavLink></li>,
    <li className='mr-4 hover:transform-3d hover:text-indigo-900 lg:text-white   text-black'><NavLink to='/myexports'>My Exports</NavLink></li>,
    <li className='mr-4 hover:transform-3d hover:text-indigo-900 lg:text-white   text-black'><NavLink to="/myimports">My Imports</NavLink></li>,
    <li className='mr-4 hover:transform-3d hover:text-indigo-900 lg:text-white  text-black'><NavLink to="/addtoexport">Add Export</NavLink></li>,

  ]

  return (
    <div className="navbar shadow-sm bg-white text-black rounded-b-2xl rounded-br-2xl p-5" >
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} className="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="indigo-900" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
        <Link className=" text-xl" to="/"><div className=' flex justify-center items-center gap-2'><FaShoppingBag className='fill-indigo-900 w-12 h-12' /><h1 className='font-bold text-black'>Import Export Hub</h1></div></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" menu-horizontal px-1 text-white">
          {links}
        </ul>
      </div>

      {/* theme toggle */}
      <div className='navbar-end flex gap-12 lg:gap-3 items-center'>
        <div className='text-center'>
          <label className=" toggle toggle-xs lg:toggle-lg  text-base-content">
            <input
              type="checkbox"
              checked={theme === 'synthwave'}
              onChange={(e) => {
                console.log('✅ Checkbox clicked!', e.target.checked);
                toggleTheme();
              }}
              className="theme-controller"
              value="synthwave"
            />

            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

          </label>
        </div>
        {user ? <div >

          {/* dropdown  */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className=" mr-5 border-2 border-indigo-900 rounded-full"><img className='h-12 w-12 rounded-full' src={user.photoURL} alt="" /></div>
            <ul tabIndex="-1" className="dropdown-content menu bg-indigo-900 text-white font-bold roundedP-box z-1 w-52 p-2 shadow-sm">
              <li><Link to="/"><CgProfile /> {user.displayName}</Link></li>
              <li><Link onClick={handleSignOut}><CiLogout /> Logout</Link></li>
            </ul>
          </div></div>
          : <div className="navbar-end ">
            <Link className="btn lg:btn-lg btn-xs  hover:transform-3d bg-gradient-to-r  from-gray-900 to-indigo-900 text-white   mr-2" to="/login">Login</Link>
            <Link className='btn border-2 lg:btn-lg btn-xs  hover:transform-3d border-indigo-900  bg-white' to="/register">Register</Link>
          </div>}
      </div>


    </div>
  );
};

export default Navbar;