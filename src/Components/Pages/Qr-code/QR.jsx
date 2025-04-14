import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';  // Corrected import
import Navbar from '../../Navbar/Navbar';
import './QR.css';

const QR = () => {
  const [inputText, setInputText] = useState('');
  const [qrValue, setQrValue] = useState('');

  // Handle text input
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Handle button click to set QR code value
  const generateQRCode = () => {
    setQrValue(inputText);
  };

  return (
    <div>
      <Navbar />
      <div className="qr-container">
        <h1 className="qr-heading">QR Code Generator</h1>
        <div className="qr-form-container">
          <input
            type="text"
            placeholder="Enter text or URL"
            value={inputText}
            onChange={handleInputChange}
            className="qr-input-field"
          />
          <button onClick={generateQRCode} className="qr-generate-button">
            Generate QR Code
          </button>
        </div>

        {qrValue && (
          <div className="qr-code-container">
            <QRCodeCanvas value={qrValue} size={256} fgColor="#000000" bgColor="#ffffff" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QR;
