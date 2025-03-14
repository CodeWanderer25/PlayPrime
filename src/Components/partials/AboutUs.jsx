import React from "react";
import { Link, useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col items-center px-6 py-16 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
      >
        ← Back
      </button>

      {/* About Section */}
      <h1 className="text-5xl font-bold text-yellow-400 mb-6">About Us</h1>
      <p className="text-lg text-gray-400 max-w-3xl text-center leading-7">
        Welcome to <span className="text-yellow-400 font-semibold">PlayPrime</span>, your ultimate destination for exploring movies, TV shows, and celebrity profiles! Our platform provides up-to-date information, trailers, and trending content from the world of entertainment.
      </p>

      {/* Feature Links */}
      <div className="mt-10 flex flex-wrap justify-center gap-8 max-w-5xl">
        {/* Feature 1 - Discover Movies */}
        <Link to="/movie" className="bg-zinc-900 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300 w-72">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">🎬 Discover Movies</h2>
          <p className="text-gray-400">Browse through the latest blockbusters, trending films, and timeless classics.</p>
        </Link>

        {/* Feature 2 - Explore TV Shows */}
        <Link to="/tvShow" className="bg-zinc-900 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300 w-72">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">📺 Explore TV Shows</h2>
          <p className="text-gray-400">Find your next binge-worthy series and keep track of your favorite TV shows.</p>
        </Link>

        {/* Feature 3 - Celebrity Profiles */}
        <Link to="/people" className="bg-zinc-900 p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300 w-72">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-2">🌟 Celebrity Profiles</h2>
          <p className="text-gray-400">Get details about your favorite actors, their filmography, and career timeline.</p>
        </Link>
      </div>

      {/* CTA Section */}
      <div className="mt-12 text-center">
        <h3 className="text-3xl font-semibold text-zinc-400">Join the PlayPrime Community!</h3>
        <p className="text-lg text-gray-400 mt-2">Stay updated with the latest entertainment news and never miss a trending movie or show.</p>
      </div>
    </div>
  );
};

export default AboutUs;
