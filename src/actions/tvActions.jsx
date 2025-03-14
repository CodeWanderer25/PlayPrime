import axios from '../utils/axios'
import { setTvInfo } from '../reducers/tvSlice';
import { removeTvInfo } from '../reducers/tvSlice';

export const asynctvPage = (id) => async (dispatch , getState) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const externalId = await axios.get(`/tv/${id}/external_ids`);
        const recommendations = await axios.get(`/tv/${id}/recommendations`);
        const similar = await axios.get(`/tv/${id}/similar`);
        const videos = await axios.get(`/tv/${id}/videos`);
        const watchProviders = await axios.get(`/tv/${id}/watch/providers`);

        let ultimateDetails = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(v => v.type === "Trailer"),
            watchProviders: watchProviders.data.results.IN,
        };
        dispatch(setTvInfo(ultimateDetails));
        console.log(ultimateDetails)
   
        
    } catch (error) {
        console.error('Error fetching tv:', error.response?.data);
        
    }

}