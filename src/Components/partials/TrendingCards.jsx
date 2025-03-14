import React, { useState } from "react";
import { Link } from "react-router-dom";

const TrendingCards = ({ data, showDropdown = true, showTitle = true, categoryy }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    categoryy(e); // Update parent state
  };

  // Filtering data based on selected category
  const filteredData =
    selectedCategory === "all"
      ? data
      : data.filter((item) => item.media_type === selectedCategory);

  return (
    <div className="w-full p-5">
      {/* Section Heading */}
      <div className="flex justify-between items-center mb-5">
        {showTitle && <h1 className="text-3xl font-semibold text-zinc-400">Trending</h1>}
        
        {/* Filter Dropdown */}
        {showDropdown && (
          <select
            value={selectedCategory}
            onChange={handleFilterChange}
            className="bg-gray-900 text-white border border-gray-700 p-2 rounded-md"
          >
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
          </select>
        )}
      </div>

      {/* Card Container */}
      <div className="flex overflow-x-auto space-x-5 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-900 p-2">
        {filteredData?.length > 0 ? (
          filteredData.map((d, index) => (
            <Link
              to={`/${d.media_type || "movie"}/details/${d.id}`}
              className="min-w-[180px] md:min-w-[220px] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-zinc-900"
              key={index}
            >
              {/* Movie Poster */}
              <img
                src={
                  d.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${d.poster_path}`
                    : "/placeholder.png"
                }
                alt={d.title || d.name}
                className="w-full h-[260px] object-cover"
              />

              {/* Movie Details */}
              <div className="p-3">
                <h1 className="text-white text-lg font-bold truncate">
                  {d.title || d.name}
                </h1>

                <p className="text-sm text-gray-400">
                  {d.release_date?.slice(0, 4) || d.first_air_date?.slice(0, 4)}
                </p>

                <span className="text-gray-400 text-sm ">{d.media_type}</span>

                <p className="text-yellow-400 font-semibold">
                  ⭐ {d.vote_average?.toFixed(1)}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-zinc-400 text-lg">No movies or TV shows available.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingCards;
