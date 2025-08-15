import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";

export default function LandingPage() {
  return (
    <div className="Landing min-h-screen flex flex-col">
      {/* Background images with orientation detection */}
      <div className="fixed inset-0 -z-10">
        {/* Portrait image (default) */}
        <div className="md:hidden absolute inset-0 bg-[url('https://i.pinimg.com/736x/d9/0d/92/d90d921f859121ca4b277e3f3787ac76.jpg')] bg-cover bg-center opacity-30"></div>
        
        {/* Landscape image (for medium screens and up) */}
        <div className="hidden md:block absolute inset-0 bg-[url('https://i.pinimg.com/1200x/e9/ff/fb/e9fffb3a1a63ed39dbfad8b721f52701.jpg')] bg-cover bg-center opacity-30"></div>
      </div>

      <Nav />
      
      {/* Main Content */}
      <main className="Landing-main flex flex-col flex-1 items-center justify-center text-center px-6 relative">
        {/* Background Waves */}
        <div className="absolute inset-0 opacity-20 z-[-1]">
          <svg viewBox="0 0 1440 320" className="absolute bottom-0">
            <path
              fill="#bbb"
              fillOpacity="0.3"
              d="M0,224L48,224C96,224,192,224,288,186.7C384,149,480,75,576,80C672,85,768,171,864,213.3C960,256,1056,256,1152,240C1248,224,1344,192,1392,176L1440,160V0H0Z"
            ></path>
          </svg>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-9xl font-bold text-blue-100 mb-4">
          Welcome
        </h1>
        <h2 className="text-lg md:text-6xl text-blue-200 font-medium mb-6">
          To Class-Room Compass
        </h2>
        <p className="max-w-2xl md:text-4xl text-gray-300 mb-8">
          Lorem ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>

        {/* CTA Button */}
        <Link to="/dashboard">
          <button className="px-4 py-2 md:px-6 md:py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition text-sm md:text-base">
            Enter To the ClassRoom
          </button>
        </Link>
      </main>
    </div>
  );
}