import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <div className="block md:hidden p-4 fixed top-0 left-0 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          <i className="ri-menu-line text-2xl"></i>
        </button>
      </div>

      {/* Side Navigation */}
      <div
        className={`w-[250px] h-full border-r-2 border-zinc-400 p-10 text-white bg-zinc-900 fixed md:relative z-40 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } transition-transform duration-100`}
      >
        <h1 className="text-2xl font-bold mb-2">
          <i className="text-blue-400 mr-2 ri-tv-2-fill"></i>
          <span>PlayPrime</span>
        </h1>
        <nav className="flex flex-col text-lg gap-2">
          <h1 className="mt-6 mb-2 font-semibold">Explore Categories</h1>
          <Link to="/trending" className="hover:bg-blue-500 rounded-lg p-2 duration-300 delay-100">
            <i className="mr-3 text-blue-100 ri-blaze-fill"></i>Trending
          </Link>
          <Link to="/popular" className="hover:bg-blue-500 rounded-lg p-2 duration-300 delay-100">
            <i className="mr-3 text-blue-100 ri-trophy-fill"></i>Popular
          </Link>
          <Link to="/movie" className="hover:bg-blue-500 rounded-lg p-2 duration-300 delay-100">
            <i className="mr-3 text-blue-100 ri-clapperboard-fill"></i>Movie
          </Link>
          <Link to="/tvshow" className="hover:bg-blue-500 rounded-lg p-2 duration-300 delay-100">
            <i className="mr-3 text-blue-100 ri-tv-fill"></i>Shows
          </Link>
          <Link to="/people" className="hover:bg-blue-500 rounded-lg p-2 duration-300 delay-100">
            <i className="mr-3 text-blue-100 ri-group-fill"></i>People
          </Link>
        </nav>
        <hr className="mt-4" />
        <nav className="flex flex-col gap-2">
          <h1 className="mt-6 font-semibold">Info</h1>
          <Link to="/about" className="hover:bg-blue-500 rounded-lg p-2 duration-300 delay-100">
            <i className="mr-3 text-blue-100 ri-information-2-fill"></i>About Us
          </Link>
          <Link to="/contact" className="hover:bg-blue-500 rounded-lg p-2 duration-300 delay-100">
            <i className="mr-3 text-blue-100 ri-phone-fill"></i>Contact Us
          </Link>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidenav;