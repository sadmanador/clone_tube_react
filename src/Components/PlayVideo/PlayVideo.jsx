import moment from "moment";
import React, { useEffect, useState } from "react";
import dislike from "../../assets/dislike.png";
import like from "../../assets/like.png";
import save from "../../assets/save.png";
import share from "../../assets/share.png";
import { API_KEY, value_converter } from "../../data";
import jack from "../../assets/jack.png";
import "./PlayVideo.css";
import { useParams } from "react-router-dom";

const PlayVideo = () => {
  const {videoId} = useParams()

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchChannelData = async () => {
    const channelDetails_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${apiData?.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDetails_url)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));

    const commentThread_url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(commentThread_url)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [apiData, videoId]);


  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apiData?.snippet.title}</h3>
      <div className="play-video-info">
        <p>
          {value_converter(apiData?.statistics.viewCount)} Views &bull;{" "}
          {moment(apiData?.snippet.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {value_converter(apiData?.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="" />
            25
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData?.snippet.thumbnails.default.url} alt="" />
        <div>
          <p>{apiData?.snippet.channelTitle}</p>
          <span>
            {value_converter(channelData?.statistics.subscriberCount)}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData?.snippet.description.slice(0, 250)}</p>
        <hr />
        <h4>{value_converter(apiData?.statistics.commentCount)} Comments</h4>

        {commentData?.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img
                src={
                  item.snippet.topLevelComment.snippet.authorProfileImageUrl
                    ? item.snippet.topLevelComment.snippet.authorProfileImageUrl
                    : jack
                }
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                  <span>{moment(item.snippet.topLevelComment.snippet.updatedAt).fromNow()}</span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>
                    {value_converter(
                      item.snippet.topLevelComment.snippet.likeCount
                    )}
                  </span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayVideo;
