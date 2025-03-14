import React, { useEffect, useState } from "react";
import Sidenav from "./partials/Sidenav";
import Topnav from "./partials/Topnav";
import Header from "./partials/Header";
import axios from "../utils/axios";
import TrendingCards from "./partials/TrendingCards";

function Home() {
  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all");

  const getHeader = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);

      let randomMovie = Math.floor(Math.random() * data.results.length);
      setWallpaper(data.results[randomMovie]);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    !wallpaper && getHeader();
    getTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-screen  overflow-x-hidden">
        <Topnav />
        <Header data={wallpaper} />
        <TrendingCards
          data={trending}
          categoryy={(e) => setCategory(e.target.value)}
        />
      </div>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}

export default Home;
