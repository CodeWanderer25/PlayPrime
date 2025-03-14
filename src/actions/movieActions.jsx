import axios from '../utils/axios'
import { setMovieInfo } from '../reducers/movieSlice';
import { removeMovieInfo } from '../reducers/movieSlice';

export const asyncMoviePage = (id) => async (dispatch , getState) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalId = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchProviders = await axios.get(`/movie/${id}/watch/providers`);

        let ultimateDetails = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(v => v.type === "Trailer"),
            watchProviders: watchProviders.data.results.IN,
        };
        dispatch(setMovieInfo(ultimateDetails));
        console.log(ultimateDetails)
   
        
    } catch (error) {
        console.error('Error fetching movie:', error.response?.data);
        
    }

}