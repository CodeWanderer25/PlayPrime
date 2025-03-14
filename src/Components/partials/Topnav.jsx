import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Topnav() {
  const [query, setQuery] = useState('');
  const [searches, setSearch] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State to control search input visibility on mobile

  const getSearch = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearch(data.results);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSearch();
  }, [query]);

  return (
    <div className="w-full md:w-[70%] h-[10vh] flex items-center mx-auto relative">
      {/* Search Icon for Mobile (Top-Right) */}
      <div className="block md:hidden p-4 fixed top-0 right-0 z-50">
        <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-white">
          <i className="ri-search-line text-2xl"></i>
        </button>
      </div>

      {/* Search Input (Visible on Desktop and when Search Icon is clicked on Mobile) */}
      <div
        className={`w-[80vw] md:w-[50%] flex items-center mx-auto relative ${isSearchOpen ? 'block' : 'hidden md:flex'}`}
      >
        <input
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          className="w-[80vw] md:mr-[5rem] p-3 outline-none border-none bg-gray-600 rounded-lg bg-transparent text-zinc-400 "
          placeholder="Search"
          type="text"
        />
        {query.length > 0 && (
          <i
            onClick={() => setQuery('')}
            className="text-zinc-400 text-3xl ri-close-line cursor-pointer"
          ></i>
        )}
      </div>

      {/* Search Results Dropdown */}
      {query.length > 0 && (
        <div className="z-[100] w-full md:w-[50%] max-h-[50vh] bg-orange-100 absolute top-[100%] left-0 md:left-[7%] overflow-auto search-results">
          {searches.map((search, index) => (
            <Link
              to={`/${search.media_type}/details/${search.id}`}
              key={index}
              className="w-full flex justify-start p-4 items-center border-b-2 border-red-200 font-semibold hover:bg-orange-200 hover:text-black transition duration-200"
            >
              <span>
                {search.original_title || search.name || search.title || search.original_name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;