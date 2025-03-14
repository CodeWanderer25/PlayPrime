import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import Movie from './Components/Movie'
import TvShows from './Components/TvShows'
import People from './Components/People'
import MovieDetails from './Components/MovieDetails'
import TvDetails from './Components/TvDetails'
import PersonDetails from './Components/PersonDetails'
import Trailer from './Components/partials/Trailer'
import AboutUs from './Components/partials/AboutUs'
import ContactUs from './Components/partials/ContactUs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-[125vw] h-screen bg-black flex '>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/trending' element = {<Trending/>}></Route>
        <Route path='/popular' element = {<Popular/>}></Route>
        <Route path='/movie' element = {<Movie/>}></Route>
        <Route path='/movie/details/:id' element = {<MovieDetails/>}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path='/tvShow' element = {<TvShows/>}></Route>
        <Route path='/tv/details/:id' element = {<TvDetails/>}>
          <Route path="trailer" element={<Trailer />} />
        </Route>
        <Route path='/people' element = {<People/>}></Route>
        <Route path='/person/details/:id' element = {<PersonDetails/>}></Route>

        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />

        <Route path='*' element={() => <div>Page not found</div>}></Route>
      </Routes>
    </div>
  )
}

export default App
