import React from "react";
import { useLocation } from "react-router-dom";
import "./HomeCard.css";

const HomeDetail = () => {
  const location = useLocation();
  const { image, content, datePublished, url } = location.state;

  return (
    <div className="home-detail-container">
      <img src={image} alt="Article" className="home-detail-image" />
      <div className="home-detail-content">
        <h1>Article Details</h1>
        <p><strong>Content:</strong> {content}</p>
        <p><strong>Date Published:</strong> {datePublished}</p>
        <a href={url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
      </div>
    </div>
  );
};

export default HomeDetail;