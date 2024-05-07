import React, { useState, useEffect } from 'react';

const HighScores = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/scores');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setScores(data);
            } catch (error) {
                console.error("Could not fetch scores:", error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div>
            <h2>High Scores</h2>
            <ul>
                {scores.map((score, index) => (
                    <li key={index}>{score.name}: {score.score}</li>
                ))}
            </ul>
        </div>
    );
};

export default HighScores;
