import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asynctvPage } from "../actions/tvActions";
import { removeTvInfo } from "../reducers/tvSlice";
import TrendingCards from "./partials/TrendingCards";

const TvDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const [showFullOverview, setShowFullOverview] = useState(false);

  useEffect(() => {
    dispatch(asynctvPage(id));
    return () => {
      dispatch(removeTvInfo());
    };
  }, [id, dispatch]);

  if (!info || !info.detail) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), 
          url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="absolute w-full min-h-screen px-10 py-10"
    >
      {/* Navigation */}
      <nav className="flex items-center gap-5 text-white text-xl">
        <button onClick={() => navigate(-1)} className="hover:text-blue-500">
          <i className="ri-arrow-left-line"></i> Back
        </button>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}`}
          className="hover:text-yellow-400"
        >
          IMDb
        </a>
      </nav>

      {/* TV Show Details Section */}
      <div className="flex flex-col md:flex-row items-center mt-10">
        {/* TV Show Poster */}
        <img
          src={
            info.detail.poster_path
              ? `https://image.tmdb.org/t/p/original/${info.detail.poster_path}`
              : "/placeholder.png"
          } // ✅ Default image
          alt={info.detail.name}
          className="w-[300px] h-[450px] object-cover rounded-lg shadow-lg"
        />

        {/* TV Show Info */}
        <div className="md:ml-10 mt-5 md:mt-0 text-white">
          <h1 className="text-4xl font-bold">
            {info.detail.name}{" "}
            <span className="text-2xl text-gray-400">
              ({info.detail.first_air_date.split("-")[0]})
            </span>
          </h1>

          {/* Genres, Release & Runtime */}
          <div className="flex flex-wrap gap-5 text-gray-300 text-lg mt-3">
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.episode_run_time?.[0] || "N/A"} min/episode</h1>
          </div>

          {/* Tagline */}
          <h1 className="text-xl italic text-yellow-400 mt-3">
            {info.detail.tagline}
          </h1>

          {/* Overview */}
          <h1 className="font-bold text-2xl mt-5">Overview</h1>
          <p className="italic text-gray-200">
            {showFullOverview
              ? info.detail.overview
              : `${info.detail.overview.slice(0, 100)}... `}
            <button
              onClick={() => setShowFullOverview(!showFullOverview)}
              className="text-blue-400"
            >
              {showFullOverview ? "Show Less" : "Read More"}
            </button>
          </p>

          {/* Rating UI */}
          <div className="flex items-center mt-5">
            <div className="relative w-12 h-12 flex items-center justify-center bg-yellow-600 rounded-full text-white text-lg font-bold">
              {(info.detail.vote_average * 10).toFixed()}%
            </div>
            <span className="ml-3 text-gray-300">User Score</span>
          </div>

          {/* Trailer Button */}
          <Link
            to={`${pathname}/trailer`}
            className="bg-blue-500 px-5 py-3 rounded-lg font-semibold text-lg mt-5 inline-block hover:bg-blue-700"
          >
            <i className="ri-play-fill text-xl mr-2"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* 🔹 Seasons Section 🔹 */}
      <hr className="mt-[5.5rem] mb-2 border-none bg-zinc-500 h-[2px]" />
      {info.detail.seasons?.length > 0 ? (
        <div className="mt-3">
          <h1 className="text-white text-2xl font-bold flex items-center gap-3 mb-4 m-4">
            <i className="ri-film-fill text-red-500 text-3xl"></i> Seasons
          </h1>

          {/* Seasons Flexbox Layout (Like Recommendations) */}
          <div className="flex gap-4 overflow-x-auto p-2">
            {info.detail.seasons.map((season) => (
              <div
                key={season.id}
                className="bg-[#222] flex-shrink-0 w-[150px] p-4 rounded-lg shadow-lg"
              >
                {/* Season Poster */}
                <img
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w200/${season.poster_path}`
                      : "/placeholder.png"
                  }
                  alt={season.name}
                  className="w-full h-[150px] object-cover rounded-lg"
                />

                {/* Season Details */}
                <div className="mt-3 text-white text-center">
                  <h2 className="text-lg font-semibold">{season.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {season.air_date || "Unknown Air Date"}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {season.episode_count} Episodes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-center text-lg mt-10 italic">
          No seasons available 😔
        </div>
      )}

      {/* 🔹 Recommendations Section 🔹 */}
      <hr className="mt-[5.5rem] mb-2 border-none bg-zinc-500 h-[2px]" />
      {info.recommendations.length > 0 || info.similar.length > 0 ? (
        <div className="mt-3">
          <h1 className="text-white text-2xl font-bold flex items-center gap-3 mb-1 m-4">
            <i className="ri-movie-2-fill text-yellow-500 text-3xl"></i>{" "}
            Recommendations
          </h1>

          <div className="mt-2">
            <TrendingCards
              data={
                info.recommendations.length > 0
                  ? info.recommendations
                  : info.similar
              }
              showDropdown={false}
              showTitle={false}
            />
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-center text-lg mt-10 italic">
          No recommendations available 😔
        </div>
      )}

      <Outlet />
    </div>
  );
};

export default TvDetails;
