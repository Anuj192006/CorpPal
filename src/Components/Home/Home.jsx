import React, { useState } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import HomeCard from "./HomeCard";

const Home = () => {
  const [result, setResult] = useState([]);

  async function News() {
    const url ="https://newsapi.org/v2/everything?q=tesla&from=2025-03-21&sortBy=publishedAt&apiKey=f0a974e6bfd849cb834fe54fef6cddfc"

    try {
      const response = await fetch(url);
      const data = await response.json();
      setResult(data.articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <Navbar />
      <h1>Welcome to CorpPal</h1>
      <button onClick={News}>hello</button>
      <div className="Group-Card">
        {result.map((ele,idx) => {
          return (
            <HomeCard
            key={idx}
            title= {ele.title}
            description={ele.description}
            url={ele.url}
            image={ele.urlToImage}
            author={ele.author}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;