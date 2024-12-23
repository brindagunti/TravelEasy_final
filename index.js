require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const { Pool } = require('pg');

// Initialize the app
const app = express();
const port = 3000;  // Adjust the port if needed
app.use(express.static(path.join(__dirname)));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "travel_easy",
    password: "db123",
    port: 5432,
});

// -------------- SIGN-UP & SIGN-IN Routes --------------
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const userCheckQuery = 'SELECT * FROM users WHERE username = $1';
        const userCheckResult = await pool.query(userCheckQuery, [username]);
        
        if (userCheckResult.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
        const insertResult = await pool.query(insertQuery, [username, password]);
        
        const newUser = insertResult.rows[0];
        console.log('Sign-up:', newUser);
        res.json({ message: 'User created', username: newUser.username });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const userQuery = 'SELECT * FROM users WHERE username = $1 AND password = $2';
        const userResult = await pool.query(userQuery, [username, password]);
        
        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = userResult.rows[0];
        console.log('Sign-in:', user);
        res.json({ token: 'dummy-token' });  // Replace with real token handling logic
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// -------------- WEATHER WEBHOOK (CHATBOT) --------------
// const OPENWEATHER_API_KEY = 'a964ba63f2b5351bd744cfc09f7c2a1f';

// app.post('/webhook', async (req, res) => {
//     const city = req.body.queryResult.parameters['geo-city']; 

//     if (!city) {
//         return res.json({
//             fulfillmentText: 'Please provide a valid city name.',
//         });
//     }

//     try {
//         const weatherResponse = await axios.get(
//             `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
//         );
//         const weatherData = weatherResponse.data;
//         const temp = weatherData.main.temp;
//         const weatherDescription = weatherData.weather[0].description;

//         const responseText = `The weather in ${city} is currently ${weatherDescription} with a temperature of ${temp}°C.`;

//         return res.json({
//             fulfillmentText: responseText,
//         });
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         return res.json({
//             fulfillmentText: `I couldn't get the weather information for ${city}. Please try again later.`,
//         });
//     }
// });

// Import necessary libraries


// API Keys
const OPENWEATHER_API_KEY = 'a964ba63f2b5351bd744cfc09f7c2a1f';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const GEMINI_API_KEY = 'AIzaSyBBekBGy3SV5i44UBaJvXWIRT83iuH6kik';

// Combined webhook for weather and location intents
app.post('/webhook', async (req, res) => {
    const { queryResult } = req.body;
    const intentName = queryResult.intent.displayName; // Identify the intent name
    
    try {
        // Handle Weather Intent
        if (intentName === 'Weather') {
            const city = queryResult.parameters['geo-city']; // Extract city parameter
            
            if (!city) {
                return res.json({
                    fulfillmentText: 'Please provide a valid city name.',
                });
            }

            // Fetch weather data
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
            );
            const weatherData = weatherResponse.data;
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            const responseText = `The weather in ${city} is currently ${weatherDescription} with a temperature of ${temp}°C.`;

            return res.json({
                fulfillmentText: responseText,
            });
        }
        
        // Handle Location Intent
        if (intentName === 'Location') {
            const location = queryResult.parameters['geo-city'] || queryResult.parameters['location'];
            
            if (!location) {
                return res.json({
                    fulfillmentText: 'Please provide a valid location.',
                });
            }

            const prompt = `Provide travel tips, points of interest, and general information about ${location}.`;

            // Call Gemini API
            const response = await axios.post(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                contents: [{ parts: [{ text: prompt }] }]
            });

            const geminiResponse = response.data.candidates[0].content.parts[0].text;

            return res.json({
                fulfillmentText: geminiResponse
            });
        }

        // Default response for unknown intents
        return res.json({
            fulfillmentText: 'Sorry, I am not sure how to handle that request.',
        });

    } catch (error) {
        console.error('Error handling webhook:', error);
        return res.json({
            fulfillmentText: 'An error occurred while processing your request. Please try again later.',
        });
    }
});



// -------------- BLOG POSTS UPLOADS --------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './uploads/'));  // Save files in the /uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Save with a timestamp and original extension
  }
});

const upload = multer({ storage: storage });

app.post('/api/blogs', upload.single('image'), async (req, res) => {
  try {
    const { description, user_id } = req.body; 

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const imagePath = `http://localhost:${port}/uploads/${req.file.filename}`;  // Adjusted to localhost:3000/uploads

    const query = 'INSERT INTO blogs (user_id, description, image_url) VALUES ($1, $2, $3) RETURNING *';
    const values = [user_id, description, imagePath];

    const result = await pool.query(query, values);
    const newBlog = result.rows[0]; 

    res.status(201).send({
      message: 'Blog post created successfully!',
      blog: {
        id: newBlog.id,
        user_id: newBlog.user_id,
        description: newBlog.description,
        image_url: newBlog.image_url,
      },
    });
  } catch (err) {
    console.error('Error inserting blog into database:', err);
    res.status(500).send('Server Error: ' + err.message);
  }
});

app.get('/api/blogs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY id DESC');
    res.status(200).send(result.rows);
  } catch (err) {
    console.error('Error fetching blogs from database:', err);
    res.status(500).send('Server Error: ' + err.message);
  }
});

// Static route for serving uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// -------------- Start the Server --------------
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
