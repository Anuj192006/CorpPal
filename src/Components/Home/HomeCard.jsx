import React from 'react'

const HomeCard = (props) => {
  return (
    <div className='card-holder'>
        <h1>{props.title}</h1>
        <h3>{props.author}</h3>
        <p>{props.description}</p>
    </div>
  )
}

export default HomeCard
