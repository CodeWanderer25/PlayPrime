import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ data }) => {
  const { pathname } = useLocation();

  if (!data) return null; // Prevents errors if data is undefined

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.8)), 
                     url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path || 'default.jpg'})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="md:w-full h-[50%] flex flex-col justify-end items-start p-[2%]"
    >
      <h1 className="text-white text-4xl mt-2 w-[70%] font-bold">
        {data.original_title || data.name || data.title || data.original_name}
      </h1>
      
      <p className="sm:w-[70%] mt-3 text-white">
        {data.overview?.slice(0, 200) || "No description available"}...
        <Link to={`/${data.media_type || 'movie'}/details/${data.id}`} className="text-blue-600">
          more
        </Link>
      </p>

      <Link
        to={`/${data.media_type || 'movie'}/details/${data.id}/trailer`}
        className="mt-3 bg-blue-700 rounded p-4 text-white hover:bg-blue-800 transition-all"
      >
        🎬 Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
