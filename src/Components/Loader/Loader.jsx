// src/Components/Loader/Loader.jsx
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Loader.css';

const Loader = () => {
    const [currentText, setCurrentText] = useState();
    const [showContent, setShowContent] = useState(false);
    const texts = ["EveryDay", "HelpFul", "Your Own CorpPal"];

    useEffect(() => {
        let i = 0;
        const textInterval = setInterval(() => {
            if (i < texts.length) {
                setCurrentText(texts[i]);
                i++;
            } else {
                clearInterval(textInterval);
                setShowContent(true); 
            }
        }, 1000);
        return () => clearInterval(textInterval);
    },[]);

    return (
        <div className="loader-container">
            {!showContent ? (
                <div 
                className="loader">
                    <p
                    >{currentText}</p>
                </div>
            ) : (
                <Navigate to="/login" />
            )}
        </div>
    );
};

export default Loader;
