import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncMoviePage } from "../actions/movieActions";
import { removeMovieInfo } from "../reducers/movieSlice";
import TrendingCards from "./partials/TrendingCards";
import WatchProviders from "./partials/WatchProviders";

const MovieDetails = () => {
  const [watchProviders, setWatchProviders] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const [showFullOverview, setShowFullOverview] = useState(false);

  useEffect(() => {
    dispatch(asyncMoviePage(id));

    //  Fetch watch providers from TMDB API
    const getWatchProviders = async () => {
      try {
        const { data } = await axios.get(`/movie/${id}/watch/providers`);
        console.log("Watch Providers Data:", data.results); 

        //  India (IN) ya USA (US) ke liye provider data
        const providers = data.results?.IN || data.results?.US;

        if (providers) {
          setWatchProviders(providers);
        } else {
          setWatchProviders(null);
        }
      } catch (error) {
        console.error("Error fetching watch providers:", error);
      }
    };

    getWatchProviders();

    return () => {
      dispatch(removeMovieInfo());
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

      {/* Movie Details Section */}
      <div className="flex flex-col md:flex-row items-center mt-10">
        {/* Movie Poster */}
        <img
          src={
            info.detail.poster_path
              ? `https://image.tmdb.org/t/p/original/${info.detail.poster_path}`
              : "/placeholder.png"
          } // ✅ Default image
          alt={info.detail.title}
          className="w-[300px] h-[450px]  object-cover rounded-lg shadow-lg"
        />

        {/* Movie Info */}
        <div className="md:ml-10 mt-5 md:mt-0 text-white">
          <h1 className="text-4xl font-bold">
            {info.detail.name || info.detail.title}{" "}
            <span className="text-2xl text-gray-400">
              ({info.detail.release_date.split("-")[0]})
            </span>
          </h1>

          {/* Genres, Release & Runtime */}
          <div className="flex flex-wrap gap-5 text-gray-300 text-lg mt-3">
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime} min</h1>
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

          <a
            href={`https://www.google.com/search?q=${info.detail.title}+watch+online`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-500 px-5 py-3 rounded-lg font-semibold text-lg mt-5 inline-block hover:bg-gray-700 ml-3"
          >
            <i className="ri-search-line text-xl mr-2"></i> Find Movie
          </a>

          <WatchProviders
            id={info.detail.id}
            type={info.detail.first_air_date ? "tv" : "movie"}
          />
        </div>
      </div>

      {/* Recommendations / Similar Movies */}
      <hr className="mt-[5.5rem] mb-2 border-none bg-zinc-500 h-[2px]" />
      {info.recommendations.length > 0 || info.similar.length > 0 ? (
        <div className="mt-3 ">
          <h1 className="text-white text-2xl font-bold flex items-center gap-3 mb-1 m-4">
            <i className="ri-movie-2-fill text-yellow-500 text-3xl"></i>
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

export default MovieDetails;
