import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import HomeCard from "./HomeCard";

const Home = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function News() {
    const url = "https://gnews.io/api/v4/search?q=example&apikey=271b1f87fdc4058c78148d4e743a3a5e";

    try {
      setLoading(true); // Start loader
      const response = await fetch(url);
      const data = await response.json();
      setResult(data.articles);
    } catch (error) {
      setResult(error)
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  }

  const handleCardClick = (ele) => {
    navigate("/home-detail", {
      state: {
        image: ele.image,
        content: ele.content,
        datePublished: ele.publishedAt,
        url: ele.url,
      },
    });
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome to CorpPal</h1>

      <p style={{fontSize:"18px"}}>This is your Corperate Life friend you can have many tools to make your life easier here!</p>
      <button onClick={News} disabled={result.length > 0 || loading}>
        {loading ? "Loading..." : result.length > 0 ? "News Already Loaded" : "Generate News Here"}
      </button>
      <div className="Group-Card">
        {result.map((ele, idx) => (
          <HomeCard
            key={idx}
            title={ele.title}
            description={ele.description}
            image={ele.image}
            author={ele.author}
            onClick={() => handleCardClick(ele)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;