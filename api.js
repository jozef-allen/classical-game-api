// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add cors module

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use cors middleware to allow requests from all origins
app.use(cors());

// Array to store high scores with default values
let highScores = [
    { playerName: 'Player1', score: 100 },
    { playerName: 'Player2', score: 90 },
    { playerName: 'Player3', score: 80 },
    { playerName: 'Player4', score: 70 },
    { playerName: 'Player5', score: 60 }
];

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Classical Game API!');
});

// Endpoint to submit high scores
app.post('/api/highscores', (req, res) => {
    const { playerName, score } = req.body;
    highScores.push({ playerName, score });
    res.sendStatus(201); // Created
});

// Endpoint to retrieve top scores
app.get('/api/highscores', (req, res) => {
    // Sort high scores by score in descending order
    const sortedScores = highScores.sort((a, b) => b.score - a.score);
    // Return top 10 scores
    res.json(sortedScores.slice(0, 10));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
