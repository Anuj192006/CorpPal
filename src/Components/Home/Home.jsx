import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
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
  const arr=["Qr-Code","Todo List","Fitness","Rephraser AI","Mail AI"]
  const arr2=["/qrcode-gen","/todo-list","/fitness","/refraser-ai","/mail-ai"]
  return (
    <div>
      <Navbar />
      <h1>Welcome to CorpPal</h1>
      <p style={{fontSize:"18px"}}>This is your Corperate Life friend you can have many tools to make your life easier here!</p>
      <ul className="Tool-group">
        {arr.map((ele, idx) => (
          <li className="Tool-card" key={idx}>
          <Link to={arr2[idx]}>
            <img src='image copy.png' alt={`${ele}`} />
            <h1>{ele}</h1>
            <p>Click here to use {ele} tool</p>
            </Link>
          </li>
        )
        )}
      </ul>
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