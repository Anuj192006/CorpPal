import React from 'react';
import './HomeCard.css';

const HomeCard = (props) => {
  return (
    <div className='card-holder' onClick={props.onClick}>
      <img src={props.image} alt="image.png" />
      <h1>{props.title}</h1>
      <h3>{props.author}</h3>
      <p>{props.description}</p>
    </div>
  );
};

export default HomeCard;