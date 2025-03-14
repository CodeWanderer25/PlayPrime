import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Trailer = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytTrailer = useSelector((state) => state[category]?.info?.videos);



  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[100] bg-[rgba(0,0,0,0.8)] backdrop-blur-md">
      {/*  Close Button */}
      <Link
        onClick={() => navigate(-1)}
        className="absolute hover:text-[#6556CD] ri-close-fill text-4xl text-white top-6 right-6 cursor-pointer"
      ></Link>

      {ytTrailer?.key ? (
        //  Trailer Available
        <div className="relative">
          {/*  Loading Spinner */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <h1 className="text-white text-2xl font-semibold animate-pulse">
                Loading...
              </h1>
            </div>
          )}

          {/* 🎥 React Player */}
          <ReactPlayer
            height="60vh"
            width="80vw"
            url={`https://www.youtube.com/watch?v=${ytTrailer.key}`}
            controls
            onReady={() => setLoading(false)} // Hide loading when ready
          />
        </div>
      ) : (
        //  No Trailer Available
        <h1 className="text-white text-2xl font-semibold">
          Trailer Not Available
        </h1>
      )}
    </div>
  );
};

export default Trailer;
