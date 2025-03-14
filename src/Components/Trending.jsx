import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav';
import Dropdown from './partials/Dropdown';
import axios from '../utils/axios';
import TrendCards from './partials/TrendCards';
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
    const navigate = useNavigate();
    const [category , setCategory] = useState("all");
    const [duration , setDuration] = useState("day");
    const [trending , setTrending] = useState([]);
    const [page , setPage] = useState(1);
    const [hasMore , setHasMore] = useState(true);

    const getTrending = async () => {
      try {

        {/**  const endpoint = duration === "all_time" 
          ? `/trending/${category}/all?page=${page}`
          : `/trending/${category}/${duration}?page=${page}`;

        const { data } = await axios.get(endpoint); */}

        
        const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
        //setTrending(data.results);

        if(data.results.length > 0) {
          setTrending((prevState) => [...prevState , ...data.results] );
          setPage(page +1);
        }
        else{
          setHasMore(false);

        }
        
  
      } catch (error) {
        console.log("error", error);
      }
    };

    console.log(trending);

    const refershHandler = () => {
      if(trending.length === 0) {
        getTrending();

      }
      else{
        setTrending([]);
        setPage(1);
        getTrending();
      }
    }
    
    useEffect(() => {
      refershHandler();
    }, [category , duration]);
    
  return (
    <div className='w-screen h-screen px-[3%]'>
      <div className='w-full flex items-center'>
        <h1 className='text-zinc-300 text-2xl w-[30%]'>
            <i className='ri-arrow-left-line mr-2 hover:text-blue-500' onClick={() => navigate(-1)}></i>
            Trending
        </h1>

        <Topnav/>

        <Dropdown title = "Category" options = {['tv' , 'movie' , 'all']} func = {(e) => setCategory(e.target.value)}/>

        <div className='w-[2%]'></div>

        <Dropdown title = "Duration" options = {['week' , 'day' , 'all_time']} func = {(e) => setDuration(e.target.value)}/>  
      </div>

      <InfiniteScroll 
        loader = {<h1>Loading...</h1>}
        dataLength={trending.length}
        next={getTrending}
        hasMore={hasMore}
        scrollThreshold={0.9}

      >
        <TrendCards data = {trending} title = {category}/>
      </InfiniteScroll>
    </div>
  )
}

export default Trending
