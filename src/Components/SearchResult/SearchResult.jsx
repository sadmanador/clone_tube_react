import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_KEY } from "../../data";
import './SearchResult.css'

const SearchResult = ({category}) => {
  const { query } = useParams(); // Get query from URL
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=20&type=video&key=${API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setResults(data.items);
        } else {
          console.error("Error fetching data:", data.error.message);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  console.log(query,results)

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {results.map((video) => (
        <Link
          to={`/video/${video?.snippet.categoryId}/${video?.id.videoId}`}
          key={video.id.videoId}
          className="video-item"
        >
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="thumbnail"
          />
          <div className="video-details">
            <h3 className="video-title">{video.snippet.title}</h3>
            <p className="video-channel">{video.snippet.channelTitle}</p>
            <p className="video-description">{video.snippet.description}</p>
          </div>
        </Link>
      ))}
    </>
  );
};

export default SearchResult;
