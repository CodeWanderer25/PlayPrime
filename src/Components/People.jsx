import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./partials/Topnav";
import Dropdown from "./partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import TrendCards from "./partials/TrendCards";

const People = () => {

    const navigate = useNavigate();
    const [category , setCategory] = useState("popular");
    const [people , setPeople] = useState([]);
    const [page , setPage] = useState(1);
    const [hasMore , setHasMore] = useState(true);

    const getPeople = async () => {
      try {

        {/**  const endpoint = duration === "all_time" 
          ? `/trending/${category}/all?page=${page}`
          : `/trending/${category}/${duration}?page=${page}`;

        const { data } = await axios.get(endpoint); */}

        
        const { data } = await axios.get(`/person/${category}?page=${page}`);
        //setTrending(data.results);

        if(data.results.length > 0) {
          setPeople((prevState) => [...prevState , ...data.results] );
          setPage(page +1);
        }
        else{
          setHasMore(false);

        }
        
  
      } catch (error) {
        console.log("error", error);
      }
    };

    console.log(people);

    const refershHandler = () => {
      if(people.length === 0) {
        getPeople();

      }
      else{
        setPeople([]);
        setPage(1);
        getPeople();
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
          People
      </h1>

      <Topnav/>

      <div className='w-[2%]'></div>


    </div>

    <InfiniteScroll 
      loader = {<h1>Loading...</h1>}
      dataLength={people.length}
      next={getPeople}
      hasMore={hasMore}
      scrollThreshold={0.9}

    >
      <TrendCards data = {people} title = 'person'/>
    </InfiniteScroll>
  </div>

  )
}

export default People
