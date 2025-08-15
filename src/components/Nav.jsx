import React, { useState } from 'react'
import { Link } from "react-router-dom";
import Logo from '../assets/C-R-CLogo.jpg'
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <header className="w-full md:w-3/4 lg:w-1/2 mx-auto py-1 px-4 md:px-10 flex justify-between items-center shadow-lg border-1 border-gray-300 rounded-[50px] relative">
        <div className="text-lg md:text-xl font-bold text-[#6c90c3]"><img src={Logo} alt="Logo Here" className='h-16 rounded-full '/></div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-blue-200 font-medium">
          <Link to="/dashboard">
            <button className="px-4 py-2 md:px-6 md:py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition text-sm md:text-base">
              Enter To the ClassRoom
            </button>
          </Link>
        </nav>

        {/* Hamburger Icon */}
        <div
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-blue/100 shadow-lg rounded-lg p-4 flex flex-col gap-4 md:hidden z-12">
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>
              <button className="px-4 py-2 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition">
                Enter To the ClassRoom
              </button>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default Nav;
