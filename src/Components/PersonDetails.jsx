import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncPersonPage } from "../actions/personActions";
import { removePersonInfo } from "../reducers/personSlice";
import TrendingCards from "./partials/TrendingCards";

const PersonDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const [showFullBio, setShowFullBio] = useState(false);
  const [showAllRoles, setShowAllRoles] = useState(false);

  useEffect(() => {
    dispatch(asyncPersonPage(id));
    return () => {
      dispatch(removePersonInfo());
    };
  }, [id, dispatch]);

  if (!info || !info.detail) {
    return (
      <div className="text-white text-center text-2xl py-10">Loading...</div>
    );
  }

  return (
    <div className="p-10 w-screen  bg-black min-h-screen text-white">
      {/* Back Button */}
      <nav className="flex items-center gap-5 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-blue-400 flex items-center gap-2 text-xl"
        >
          <i className="ri-arrow-left-line"></i> Back
        </button>
      </nav>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section - Profile & Social Media */}
        <div className="md:w-1/3 flex flex-col items-center">
          {/* Profile Image */}
          <img
            src={
              info.detail.profile_path
                ? `https://image.tmdb.org/t/p/original/${info.detail.profile_path}`
                : "/placeholder.png"
            }
            alt={info.detail.name}
            className="w-[300px] h-[400px] object-cover rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
          />

          {/* Social Media Links */}
          <div className="flex gap-4 text-3xl mt-5">
            {info.externalId.facebook_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/${info.externalId.facebook_id}`}
                className="text-blue-500 hover:text-yellow-400 transition duration-300"
              >
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}
            {info.externalId.instagram_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.instagram.com/${info.externalId.instagram_id}`}
                className="text-pink-500 hover:text-yellow-400 transition duration-300"
              >
                <i className="ri-instagram-fill"></i>
              </a>
            )}
            {info.externalId.twitter_id && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.twitter.com/${info.externalId.twitter_id}`}
                className="text-blue-400 hover:text-yellow-400 transition duration-300"
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
          </div>

          {/* Personal Information */}
          <div className="mt-8 bg-zinc-800 p-5 rounded-lg w-full max-w-xs">
            <h2 className="text-lg font-semibold text-yellow-400 mb-2">
              Personal Info
            </h2>
            <p className="text-sm text-zinc-300">
              <span className="font-semibold">Known For:</span>{" "}
              {info.detail.known_for_department}
            </p>
            <p className="text-sm text-zinc-300">
              <span className="font-semibold">Gender:</span>{" "}
              {info.detail.gender === 2 ? "Male" : "Female"}
            </p>
            <p className="text-sm text-zinc-300">
              <span className="font-semibold">Birth:</span>{" "}
              {info.detail.birthday} -{" "}
              {info.detail.deathday ? info.detail.deathday : "Alive"}
            </p>
            <p className="text-sm text-zinc-300">
              <span className="font-semibold">Place of Birth:</span>{" "}
              {info.detail.place_of_birth}
            </p>
          </div>
        </div>

        {/* Right Section - Name & Biography */}
        <div className="md:w-2/3">
          <h1 className="text-5xl font-bold text-yellow-400">
            {info.detail.name}
          </h1>

          {/* Biography */}
          <h2 className="text-2xl text-white font-semibold mt-5">Biography</h2>
          <p className="text-zinc-300 mt-3">
            {showFullBio
              ? info.detail.biography
              : `${info.detail.biography.slice(0, 350)}...`}
          </p>
          {info.detail.biography.length > 350 && (
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="text-blue-400 mt-3 underline hover:text-blue-300"
            >
              {showFullBio ? "Show Less" : "Read More"}
            </button>
          )}

          {/* Movies & TV Shows */}

          <div className="mt-10">
            <h1 className="text-3xl font-semibold text-zinc-400 mb-5">
              Movies & TV Shows
            </h1>
            <TrendingCards
              data={info.combinedCredits.cast}
              showDropdown={false}
              showTitle={false}
              type="movie"
            />
          </div>

          {/* Acting Information */}
          <div className="mt-10">
            <h1 className="text-3xl font-semibold text-zinc-400 mb-5">
              Acting Roles
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {info.combinedCredits.cast.length > 0 ? (
                info.combinedCredits.cast
                  .slice(0, showAllRoles ? info.combinedCredits.cast.length : 6) // Show limited roles
                  .map((role, index) => (
                    <div
                      key={index}
                      className="p-4 bg-zinc-900 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                    >
                      <h2 className="text-xl text-white font-semibold truncate">
                        {role.title || role.name}
                      </h2>
                      <p className="text-zinc-400 mt-1 text-sm">
                        Character:{" "}
                        <span className="text-yellow-400">
                          {role.character || "Unknown"}
                        </span>
                      </p>
                      <p className="text-gray-400 text-sm">
                        (
                        {role.release_date?.slice(0, 4) ||
                          role.first_air_date?.slice(0, 4)}
                        )
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-zinc-400">No acting roles found.</p>
              )}
            </div>

            {/* Show More / Show Less Button */}
            {info.combinedCredits.cast.length > 6 && (
              <button
                onClick={() => setShowAllRoles(!showAllRoles)}
                className="mt-9 px-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
              >
                {showAllRoles ? "Show Less" : "Show More"}
              </button>
            )}
          </div>

          {/* Horizontal Career Timeline */}
          <div className="mt-10 mb-20">
            {" "}
            {/* Added mb-20 for extra space below */}
            <h1 className="text-3xl font-semibold text-zinc-400 mb-5">
              Career Timeline
            </h1>
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide flex space-x-5 p-4 bg-zinc-900 rounded-lg">
              {info.combinedCredits.cast
                .filter((role) => role.release_date || role.first_air_date) // Only roles with a date
                .sort((a, b) =>
                  (b.release_date || b.first_air_date || "").localeCompare(
                    a.release_date || a.first_air_date || ""
                  )
                ) // Sort by latest first
                .map((role, index) => (
                  <Link
                    key={index}
                    to={`/${role.media_type}/details/${role.id}`} // Navigate to the correct details page
                    className="min-w-[250px] w-[250px] p-4 bg-zinc-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                  >
                    <p className="text-yellow-400 text-lg font-semibold">
                      {role.release_date?.slice(0, 4) ||
                        role.first_air_date?.slice(0, 4)}
                    </p>
                    {/* Title Fix: Clamped Text */}
                    <h2 className="text-xl text-white font-semibold truncate w-full">
                      {role.title || role.name}
                    </h2>
                    <p className="text-zinc-400">
                      Character:{" "}
                      <span className="text-yellow-400">
                        {role.character || "Unknown"}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      {role.media_type === "movie" ? "🎬 Movie" : "📺 TV Show"}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
