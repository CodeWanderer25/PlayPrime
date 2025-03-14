import React, { useEffect, useState } from "react";
import axios from "../../utils/axios"; // ✅ Using Configured Axios Instance

const WatchProviders = ({ id, type }) => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchWatchProviders = async () => {
      try {
        const endpoint = type === "tv" ? `/tv/${id}/watch/providers` : `/movie/${id}/watch/providers`;
        const { data } = await axios.get(endpoint);
  
        console.log("Watch Providers API Response:", data.results); //  Debugging Step
  
        if (data.results && data.results.IN) {  // 🔄 Change 'IN' if needed
          setProviders(data.results.IN.flatrate || data.results.IN.buy || data.results.IN.rent || []);
        }
      } catch (error) {
        console.error("Error fetching watch providers:", error);
      }
    };
  
    fetchWatchProviders();
  }, [id, type]);
  

  return (
    <div>
      <h2 className="text-white text-xl font-bold">Available On:</h2>
      <div className="flex gap-3 mt-2">
        {providers.length > 0 ? (
          providers.map((provider) => (
            <div key={provider.provider_id} className="flex items-center bg-gray-800 p-2 rounded-lg">
              <img
                src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                alt={provider.provider_name}
                className="w-12 h-12 rounded-md"
              />
              <span className="text-white ml-2">{provider.provider_name}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Not available for streaming.</p>
        )}
      </div>
    </div>
  );
};

export default WatchProviders;
