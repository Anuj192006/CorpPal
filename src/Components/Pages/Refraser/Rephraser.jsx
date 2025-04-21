import React, { useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import './Rephraser.css';

const Rephraser = () => {
  const [inputText, setInputText] = useState('')
  const [tone, setTone] = useState('Formal')
  const [outputText, setOutputText] = useState('')
  const [loading, setLoading] = useState(false)

  const tones = [
    "Formal", "Friendly", "Casual", "Professional", "Diplomatic", "Confident",
    "Middle school", "High school", "Academic", "Simplified", "Vivid", "Empathetic",
    "Luxury", "Engaging"
  ]

  const handleRephrase = async () => {
    if (!inputText.trim()){ 
      return
    }
    setLoading(true)

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
                text: `Rephrase the following paragraph in a ${tone} tone:\n\n"${inputText}" and return in such a way that react should render the message and display the spaces and new line break in the same original way`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const responseText = data.candidates[0]?.content.parts[0]?.text?.trim()
      setOutputText(responseText || 'Could not generate rephrased text.')
    } catch (error) {
      console.error('Error:', error)
      setOutputText('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <Navbar />
      <div className="rephraser-container">
        <h1>Paragraph Rephraser</h1>
        
        <textarea
          placeholder="Enter your paragraph here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="rephraser-textarea"
        />

        <div className="rephraser-controls">
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="rephraser-dropdown">
            {tones.map((t, index) => (
              <option key={index} value={t}>{t}</option>
            ))}
          </select>

          <button className="rephraser-button" onClick={handleRephrase}>
            {loading ? 'Rephrasing...' : 'Rephrase'}
          </button>
        </div>
        <div style={{display:"flex", alignContent:"center" , justifyContent:"center", alignItems:"center"}}>
        <div className="rephraser-output">
          <h3>Rephrased Output:</h3>
          <p>{outputText}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Rephraser;
