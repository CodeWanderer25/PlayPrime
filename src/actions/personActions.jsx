import axios from '../utils/axios'
import { setPersonInfo } from '../reducers/personSlice';
import { removePersonInfo } from '../reducers/personSlice';

export const asyncPersonPage = (id) => async (dispatch , getState) => {
    try {
        const detail = await axios.get(`/person/${id}`);
        const externalId = await axios.get(`/person/${id}/external_ids`);
        const combinedCredits = await axios.get (`/person/${id}/combined_credits`);
        const movieCredits = await axios.get (`/person/${id}/movie_credits`);
        const tvCredits = await axios.get (`/person/${id}/tv_credits`);
       

        let ultimateDetails = {
            detail: detail.data,
            externalId: externalId.data,
            movieCredits: movieCredits.data,
            tvCredits: tvCredits.data,
            combinedCredits: combinedCredits.data,

          
        };
        dispatch(setPersonInfo(ultimateDetails));
        console.log(ultimateDetails)
   
        
    } catch (error) {
        console.error('Error fetching person:', error.response?.data);
        
    }

}