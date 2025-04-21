import React, { useState, useEffect } from 'react';
import Navbar from '../../Navbar/Navbar';
import './Fitness.css';

const Fitness = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const allUsers = JSON.parse(localStorage.getItem('users')) || [];

  const [steps, setSteps] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [coffeeIntake, setCoffeeIntake] = useState('');
  const [feedback, setFeedback] = useState('');

  const [loading, setLoading] = useState(false);

  const [concern, setConcern] = useState('');
  const [stressFeedback, setStressFeedback] = useState('');

  const generateMessage = async () => {
    if (!steps.trim() || !hoursWorked.trim() || !coffeeIntake.trim()) return;

    setLoading(true);

    try {
      const apiKey = 'AIzaSyCG7f57YhdvTLkuXMWkmeAClOxZsm_0D28';

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Return exactly in a single line what is a Mental health of a person will be if they have walked ${steps} steps, worked ${hoursWorked} hours, and had ${coffeeIntake} cups of coffee today.this is not insufficient as walking helps in digestion hours worked tells about screentime mental health and coffe attacks on heart so tell accordingingly answer in 2-3 words`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      let responseText = data.candidates[0].content.parts[0].text;

      responseText = responseText.replace(/```javascript|```/, '')
      const result = responseText.trim();

      setFeedback(result);
    } catch (error) {
      console.error('Error:', error);
      setFeedback('Failed to generate message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const generatestress = async () => {
    if (!concern.trim()) {
      return
    }

    setLoading(true);

    try {
      const apiKey = 'AIzaSyCG7f57YhdvTLkuXMWkmeAClOxZsm_0D28'; // Secure this key

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `I have a concern, which is: ${concern}. If it is not related to corporate life stress, just tell me this is not corporate stress. If it is related to corporate stress, suggest some methods to manage it in 2-3 lines.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      let responseText = data.candidates[0].content.parts[0].text;

      responseText = responseText.replace(/```javascript|```/g, '');
      const result = responseText.trim();

      setStressFeedback(result);
    } catch (error) {
      console.error('Error:', error);
      setStressFeedback('Failed to generate response. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="stress">
        <h2>Share your Corp-Concern</h2>
        <input
          type="text"
          placeholder="Share your concern here"
          onChange={()=>setConcern(e.target.value)}
          value={concern}
        />
        <button
          style={{ width: '200px' }}
          className="fitness-submit-button"
          onClick={generatestress}
        >
          Generate Suggestion
        </button>
        <p style={{width:"70%"}} className="fitness-feedback">
          {loading ? 'Generating response...' : stressFeedback}
        </p>
      </div>

      <div className="fitness-container">
        <h1 className="fitness-heading">Fitness Tracker</h1>

        <div className="fitness-input-container">
          <input
            type="number"
            placeholder="Enter number of steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="fitness-input"
          />
          <input
            type="number"
            placeholder="Enter hours worked"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(e.target.value)}
            className="fitness-input"
          />
          <input
            type="number"
            placeholder="Enter coffee intake"
            value={coffeeIntake}
            onChange={(e) => setCoffeeIntake(e.target.value)}
            className="fitness-input"
          />
        </div>

        <button onClick={()=>generateMessage()} className="fitness-calculate-button">
          Calculate
        </button>

        <p className="fitness-feedback">{loading ? 'Generating message...' : feedback}</p>

      </div>
    </div>
  );
};

export default Fitness;
