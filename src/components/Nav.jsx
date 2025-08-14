import React from 'react'
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="w-1/2 m-auto py-2 px-10 flex justify-between items-center shadow-lg border-1 border-gray-300 rounded-[50px]">
        <div className="text-xl font-bold text-[#6c90c3]">LOGO HERE</div>
        <nav className="hidden md:flex gap-8 text-blue-200 font-medium">
        <Link to="/dashboard">
      <button className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition">
        Enter To the ClassRoom
      </button>
    </Link>
          {/* <a href="#home" className="hover:text-gray-500">
            HOME
          </a>
          <a href="#services" className="hover:text-gray-500">
            SERVICES
          </a>
          <a href="#about" className="hover:text-gray-500">
            ABOUT
          </a>
          <a href="#contact" className="hover:text-gray-500">
            CONTACT
          </a> */}
        </nav>
        <div className="md:hidden flex flex-col gap-1 cursor-pointer">
          <span className="w-6 h-[2px] bg-gray-800"></span>
          <span className="w-6 h-[2px] bg-gray-800"></span>
          <span className="w-6 h-[2px] bg-gray-800"></span>
        </div>
      </header>

    </div>
  )
}

export default Nav
