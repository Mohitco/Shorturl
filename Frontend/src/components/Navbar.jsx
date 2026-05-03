import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from '../assets/logo.png';

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div className="bg-white shadow-md px-3 sm:px-6 md:px-10 py-3">
        <div className="flex items-center justify-between">

          {/* Left side */}
          <div className="flex items-center gap-3">

            {/* Mobile Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setOpenMenu(true)}
            >
              <Menu size={28} />
            </button>

            {/* Logo */}
            <div>
              <img
                className="w-8 sm:w-7 inline-block"
                src={logo}
                alt="logo"
              />
              <span className="font-bold text-xl sm:text-1xl ml-2">
                Short<span className="text-blue-700">URL</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link className="hover:text-blue-700" to="/">Home</Link>
            <Link className="hover:text-blue-700" to="/feature">Feature</Link>
            <Link className="hover:text-blue-700" to="/benefits">Benefits</Link>
            <Link className="hover:text-blue-700" to="/work">How it Works</Link>
            <Link className="hover:text-blue-700" to="/pricing">Pricing</Link>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-1 py-1 sm:px-3 sm:py-2 rounded-lg hover:text-black"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-600 text-white sm:px-3 sm:py-2 px-1 py-1 rounded-lg hover:text-black"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          openMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">

          <button
            className="mb-6"
            onClick={() => setOpenMenu(false)}
          >
            <X size={28} />
          </button>

          <div className="flex flex-col gap-5 text-lg">
            <Link to="/home">Home</Link>
            <Link to="/feature">Feature</Link>
            <Link to="/benefits">Benefits</Link>
            <Link to="/work">How it Works</Link>
            <Link to="/pricing">Pricing</Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;