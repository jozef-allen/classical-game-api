// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add cors module

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use cors middleware to allow requests only from classical-music-quiz.com
app.use(cors({
  origin: function (origin, callback) {
    // Check if the request origin matches classical-music-quiz.com
    if (origin && origin.includes('classical-music-quiz.com')) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  }
}));

// Array to store high scores with default values
let highScores = [
    { playerName: 'Player1', score: 5 },
    { playerName: 'Player2', score: 4 },
    { playerName: 'Player3', score: 3 },
    { playerName: 'Player4', score: 2 },
    { playerName: 'Player5', score: 1 }
];

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Classical Game API!');
});

// Endpoint to submit high scores
app.post('/api/highscores', (req, res) => {
    const { playerName, score } = req.body;
    if (highScores.length >= 10) {
        // If there are already 10 high scores, remove the lowest one
        highScores.pop();
    }
    // Add the new score to the array
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
