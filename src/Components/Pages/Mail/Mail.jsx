import React, { useState } from 'react';
import Navbar from '../../Navbar/Navbar';
import './Mail.css';

const Mail = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('Formal');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRephrase = async () => {
    if (!description.trim()) return;

    setLoading(true);
    setCopied(false);

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
                text: `Draft an email in ${tone} tone with the subject "${subject}" and the following body:\n\n"${description}".\n\nReturn only the plain email content, not as React code. Keep all formatting like new lines and indentation. Make sure it's readable as email text.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const responseText = data.candidates[0]?.content.parts[0]?.text?.trim();
      setOutputText(responseText || 'Could not generate email.');
    } catch (error) {
      console.error('Error:', error);
      setOutputText('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error('Copy failed:', err));
  };

  return (
    <>
      <Navbar />
      <div className="mail-container">
        <h2>Mail Drafter</h2>

        <div className="mail-form">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mail-input"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mail-textarea"
          />

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="mail-dropdown"
          >
            {[
              'Formal', 'Friendly', 'Casual', 'Professional', 'Diplomatic',
              'Confident', 'Middle school', 'High school', 'Academic',
              'Simplified', 'Vivid', 'Empathetic', 'Luxury', 'Engaging'
            ].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <button onClick={handleRephrase} disabled={loading} className="mail-button">
            {loading ? 'Generating...' : 'Generate Mail'}
          </button>
        </div>

        {outputText && (
          <div>
            <div className="copy-section">
              <button onClick={handleCopy} className="copy-button">Copy to Clipboard</button>
              {copied && <span className="copy-confirm">Copied!</span>}
            </div>
            <div className="mail-output">
              <h3>Generated Mail</h3>
              <pre>{outputText}</pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Mail;
