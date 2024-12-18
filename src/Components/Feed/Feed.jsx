import React, { useEffect, useState } from "react";
import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import thumbnail2 from "../../assets/thumbnail2.png";
import thumbnail3 from "../../assets/thumbnail3.png";
import thumbnail4 from "../../assets/thumbnail4.png";
import thumbnail5 from "../../assets/thumbnail5.png";
import thumbnail6 from "../../assets/thumbnail6.png";
import thumbnail7 from "../../assets/thumbnail7.png";
import thumbnail8 from "../../assets/thumbnail8.png";
import { Link } from "react-router-dom";
import { API_KEY } from "../../data";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const videoList_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoList_url);

      if (!response.ok) {
        throw new Error("Failed to fetch videos.");
      }

      const result = await response.json();
      setData(result.items || []);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  console.log(data[0]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link
            key={index}
            to={`video/${item.snippet.categoryId}/${item.id}`}
            className="card"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{item.statistics.viewCount} views &bull; 2 days ago</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
