import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDhkZTBkZjRmNzI5MmNkMDE3ODZlOTc2MjU0YjU0OCIsIm5iZiI6MTczOTU5MzEwMS44NjUsInN1YiI6IjY3YjAxNThkNDdkYmZiYTQ2NDZjNDQ2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I6xR7JSJAUznaeGSPWYZ_Po0C7h4mCqus0HYzScQxD0'
      },

});

export default instance;
