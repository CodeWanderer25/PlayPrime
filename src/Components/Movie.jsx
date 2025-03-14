import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import TrendCards from './partials/TrendCards';

const Movie = () => {

    const navigate = useNavigate();
    const [category , setCategory] = useState("now_playing");
    const [movie , setMovie] = useState([]);
    const [page , setPage] = useState(1);
    const [hasMore , setHasMore] = useState(true);

    const getMovie = async () => {
      try {

        {/**  const endpoint = duration === "all_time" 
          ? `/trending/${category}/all?page=${page}`
          : `/trending/${category}/${duration}?page=${page}`;

        const { data } = await axios.get(endpoint); */}

        
        const { data } = await axios.get(`/movie/${category}?page=${page}`);
        //setTrending(data.results);

        if(data.results.length > 0) {
          setMovie((prevState) => [...prevState , ...data.results] );
          setPage(page +1);
        }
        else{
          setHasMore(false);

        }
        
  
      } catch (error) {
        console.log("error", error);
      }
    };

    console.log(movie);

    const refershHandler = () => {
      if(movie.length === 0) {
        getMovie();

      }
      else{
        setMovie([]);
        setPage(1);
        getMovie();
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
            Movie - {category}
        </h1>

        <Topnav/>

        <Dropdown title = "Category" options = {['popular' , 'top_rated' , 'upcoming' , 'now_playing']} func = {(e) => setCategory(e.target.value)}/>

        <div className='w-[2%]'></div>

  
      </div>

      <InfiniteScroll 
        loader = {<h1>Loading...</h1>}
        dataLength={movie.length}
        next={getMovie}
        hasMore={hasMore}
        scrollThreshold={0.9}

      >
        <TrendCards data = {movie} title = 'movie'/>
      </InfiniteScroll>
    </div>
  )
}

export default Movie
