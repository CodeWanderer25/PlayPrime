import React from "react";
import { Link } from "react-router-dom";

const TrendCards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-screen justify-center bg-black">
      {data.map((card, index) => (
        <Link
          to={`/${card.media_type || title}/details/${card.id}`}
          key={index}
          className="relative w-[25vh] mr-[5%] mb-[5%]"
        >
          <img
            src={`https://image.tmdb.org/t/p/original/${
              card.poster_path || card.backdrop_path || card.profile_path
            }`}
            alt=""
            className="object-cover h-[40vh] shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
          />

          <h1 className="text-zinc-300 text-1xl font-semibold mt-[3%]">
            {card.title ||
              card.name ||
              card.original_name ||
              card.original_title}
          </h1>

          {card.vote_average && (
            <div
              className="text-white bg-yellow-700 w-[6vh] h-[6vh] flex justify-center items-center rounded-full font-semibold text-xl
                                absolute right-[-9%] bottom-[5%]"
            >
              {(card.vote_average * 10).toFixed()}
              <sup>%</sup>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default TrendCards;
