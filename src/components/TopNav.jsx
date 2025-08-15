import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopNav = () => {
  // State to manage the visibility of the user and mobile menus
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State to track if the view is mobile based on screen width
  const [isMobile, setIsMobile] = useState(false);

  // Hook to handle window resizing and determine if the view is mobile
  useEffect(() => {
    const handleResize = () => {
      // Set isMobile to true if the window width is less than 768px
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Initial check on component mount
    window.addEventListener("resize", handleResize); // Add resize listener
    return () => window.removeEventListener("resize", handleResize); // Cleanup listener on unmount
  }, []);

  // Hook to close the menus when a click occurs outside of them
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if a mobile menu is open and the click is outside its container
      if (mobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setMobileMenuOpen(false);
      }
      // Check if a user menu is open and the click is outside its container
      if (userMenuOpen && !event.target.closest(".user-menu-container")) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add mousedown listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener on unmount
    };
  }, [mobileMenuOpen, userMenuOpen]);

  // Reusable JSX for the user menu dropdown
  const UserMenuDropdown = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
      <a
        href="#"
        className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100"
      >
        Profile
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100"
      >
        Settings
      </a>
      <a
        href="#"
        className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100"
      >
        Sign out
      </a>
    </div>
  );

  return (
    <header className="backdrop-blur-sm mb-6 text-white p-4 shadow-md relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Mobile menu button, only shown on mobile */}
          {isMobile && (
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setUserMenuOpen(false); // Close user menu if mobile menu is opened
              }}
              className="mr-3 p-2 rounded-full hover:bg-primary-light"
            >
              {/* FiMenu icon as inline SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          )}
          <h1 className="text-xl font-bold">Analytics Dashboard</h1>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex items-center space-x-4">
            <Link to="/classroom">
              <button
                className="border-2 flex items-center justify-center bg-white text-primary font-medium px-3 py-1 rounded-full 
                         hover:bg-primary-light hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                {/* FiPlus icon as inline SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span className="text-blue-950 font-semibold">Start Class</span>
              </button>
            </Link>

            <button className="p-2 rounded-full hover:bg-primary-light">
              {/* FiSearch icon as inline SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <button className="p-2 rounded-full hover:bg-primary-light relative">
              {/* FiBell icon as inline SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="relative user-menu-container">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 hover:bg-primary-light rounded-full p-1 pl-3"
              >
                <span>John Doe</span>
                <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
                  {/* FiUser icon as inline SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              </button>
              {userMenuOpen && <UserMenuDropdown />}
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <div className="flex items-center space-x-4 relative mobile-menu-container">
            {/* User icon on mobile, always visible */}
            <div className="relative user-menu-container">
              <button
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setMobileMenuOpen(false); // Close mobile menu if user menu is opened
                }}
                className="h-8 w-8 rounded-full bg-white flex items-center justify-center"
              >
                {/* FiUser icon as inline SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-[100]">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>

            {/* Main mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-12 bg-white rounded-md shadow-lg py-2 z-[100] w-48 mt-2">
                <Link to="/classroom">
              <button
                className="border-2 flex items-center justify-center bg-white text-primary font-medium px-3 py-1 rounded-full 
                         hover:bg-primary-light hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                {/* FiPlus icon as inline SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span className="text-blue-950 font-semibold">Start Class</span>
              </button>
            </Link>
                <button className="w-full text-left px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100 flex items-center">
                  {/* FiSearch icon as inline SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  Search
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100 flex items-center relative">
                  {/* FiBell icon as inline SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 0 0 1-3.46 0"></path>
                  </svg>
                  Notifications
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-blue-950 font-semibold hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default TopNav;
