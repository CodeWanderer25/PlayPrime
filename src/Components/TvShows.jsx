import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import TrendCards from "./partials/TrendCards";

const TvShows = () => {

    const navigate = useNavigate();
    const [category , setCategory] = useState("airing_today");
    const [tvShow , setTvShow] = useState([]);
    const [page , setPage] = useState(1);
    const [hasMore , setHasMore] = useState(true);

    const getTvShow = async () => {
      try {

        {/**  const endpoint = duration === "all_time" 
          ? `/trending/${category}/all?page=${page}`
          : `/trending/${category}/${duration}?page=${page}`;

        const { data } = await axios.get(endpoint); */}

        
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
        //setTrending(data.results);

        if(data.results.length > 0) {
          setTvShow((prevState) => [...prevState , ...data.results] );
          setPage(page +1);
        }
        else{
          setHasMore(false);

        }
        
  
      } catch (error) {
        console.log("error", error);
      }
    };

    console.log(tvShow);

    const refershHandler = () => {
      if(tvShow.length === 0) {
        getTvShow();

      }
      else{
        setTvShow([]);
        setPage(1);
        getTvShow();
      }
    }
    
    useEffect(() => {
      refershHandler();
    }, [category]);


  return (
    <div className='w-screen h-screen px-[3%]'>
    <div className='w-full flex items-center'>
      <h1 className='text-zinc-300 text-2xl w-[30%]'>
          <i className='ri-arrow-left-line mr-2 hover:text-blue-500' onClick={() => navigate(-1)}></i>
          TvShow
      </h1>

      <Topnav/>

      <Dropdown title = "Category" options = {['on_the_air' , 'popular' , 'top_rated' , 'airing_today']} func = {(e) => setCategory(e.target.value)}/>

      <div className='w-[2%]'></div>


    </div>

    <InfiniteScroll 
      loader = {<h1>Loading...</h1>}
      dataLength={tvShow.length}
      next={getTvShow}
      hasMore={hasMore}
      scrollThreshold={0.9}

    >
      <TrendCards data = {tvShow} title = 'tv'/>
    </InfiniteScroll>
  </div>
  )
}

export default TvShows
