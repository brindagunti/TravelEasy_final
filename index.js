require('dotenv').config();

const nodemailer = require("nodemailer");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const { Pool } = require('pg');
const { GoogleGenerativeAI } = require('@google/generative-ai');
// Initialize the app
const app = express();
const port = 3000;  // Adjust the port if needed
app.use(express.static(path.join(__dirname)));


// Middleware
app.use(cors());
app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
        user: "mittapallibharathkumar2005@gmail.com",  // Your Gmail address
        pass: "qutngbjqayjoxsxi",                      // Your Gmail app password
    },
    port: 465,
    secure: true,
    connectionTimeout: 20000,  // Increased timeout
    greetingTimeout: 20000,
});



// PostgreSQL connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "travel_easy",
    password: "db123",
    port: 5432,
});

// -------------- SIGN-UP & SIGN-IN Routes --------------
// app.post('/signup', async (req, res) => {
//     const { username, password } = req.body;
    
//     try {
//         const userCheckQuery = 'SELECT * FROM users WHERE username = $1';
//         const userCheckResult = await pool.query(userCheckQuery, [username]);
        
//         if (userCheckResult.rows.length > 0) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }

//         const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
//         const insertResult = await pool.query(insertQuery, [username, password]);
        
//         const newUser = insertResult.rows[0];
//         console.log('Sign-up:', newUser);
//         res.json({ message: 'User created', username: newUser.username });
//     } catch (error) {
//         console.error('Error during sign-up:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const userCheckQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const userCheckResult = await pool.query(userCheckQuery, [username, email]);

        if (userCheckResult.rows.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
        const insertResult = await pool.query(insertQuery, [username, email, password]);

        const newUser = insertResult.rows[0];
        console.log('Sign-up:', newUser);
        res.json({ message: 'User created', username: newUser.username });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// app.post('/signin', async (req, res) => {
//     console.log('Sign-in Request Received');
//     const { username, password } = req.body;
    
//     try {
//         const userQuery = 'SELECT * FROM users WHERE username = $1 AND password = $2';
//         const userResult = await pool.query(userQuery, [username, password]);
        
//         if (userResult.rows.length === 0) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const user = userResult.rows[0];
//         console.log('Sign-in:', user);
//         res.json({ token: 'dummy-token' });  // Replace with real token handling logic
//     } catch (error) {
//         console.error('Error during sign-in:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// app.post('/signin', async (req, res) => {
//     const { usernameOrEmail, password } = req.body;
    
//     try {
//         // Check if the provided username or email exists in the database
//         const userCheckQuery = `
//             SELECT * FROM users WHERE username = $1 OR email = $2
//         `;
//         const userCheckResult = await pool.query(userCheckQuery, [usernameOrEmail, usernameOrEmail]);
        
//         if (userCheckResult.rows.length === 0) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         const user = userCheckResult.rows[0];

//         // Verify password (assumes password is stored securely)
//         if (user.password !== password) {
//             return res.status(400).json({ message: 'Incorrect password' });
//         }

//         console.log('Sign-in:', user);
//         res.json({ message: 'Sign-in successful', username: user.username });
//     } catch (error) {
//         console.error('Error during sign-in:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.post('/signin', async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    
    try {
        // Check if the provided username or email exists in the database
        const userCheckQuery = `
            SELECT * FROM users WHERE username = $1 OR email = $2
        `;
        const userCheckResult = await pool.query(userCheckQuery, [usernameOrEmail, usernameOrEmail]);
        
        if (userCheckResult.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        const user = userCheckResult.rows[0];

        // Verify password (assumes password is stored securely)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        console.log('Sign-in:', user);

        // Send a greeting email to the user
        var transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            auth: {
                user: "mittapallibharathkumar2005@gmail.com",
                pass: "kmnbisrgbyoqonyu",  // Make sure to replace with app-specific password
            },
            port: 465,
            secure: true,
            connectionTimeout: 10000,
            greetingTimeout: 10000,
        });

        var mailOptions = {
            from: "mittapallibharathkumar2005@gmail.com",
            to: user.email,  // Send the email to the user's email address
            subject: "Welcome to TravelEasy!",
            text: `Hello ${user.username},\n\nWelcome to TravelEasy, where your next adventure is just a click away! We're thrilled to have you as part of our community. Whether you're planning your dream vacation or exploring new destinations, TravelEasy is here to make your journey seamless and unforgettable.\nThank you for choosing TravelEasy – let’s start exploring!\n\nBest regards,\nThe TravelEasy Team`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.error("Error in sending mail: ", err);
            } else {
                console.log("Email sent successfully: ", info.response);
            }
        });

        res.json({ message: 'Sign-in successful', username: user.username });
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// API Keys
const genAI = new GoogleGenerativeAI("AIzaSyBBekBGy3SV5i44UBaJvXWIRT83iuH6kik");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// OpenWeather API key
const openWeatherApiKey = 'a964ba63f2b5351bd744cfc09f7c2a1f';

// Serve static files like HTML, CSS, and JS from the 'public' folder
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Helper function to fetch weather data
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return `The current weather in ${data.name} is ${data.weather[0].description} with a temperature of ${data.main.temp}°C.`;
        } else {
            return `Unable to fetch weather for "${city}". Please make sure the city name is correct.`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return 'Error fetching weather data. Please try again later.';
    }
}

// Chatbot route to handle messages
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Check if the user is asking about weather
        if (userMessage.toLowerCase().includes('weather')) {
            const cityMatch = userMessage.match(/weather in (\w+)/i);
            if (cityMatch) {
                const city = cityMatch[1];
                const weatherResponse = await getWeather(city);
                return res.json({ reply: weatherResponse });
            } else {
                return res.json({ reply: 'Please specify the city, e.g., "What is the weather in London?"' });
            }
        }

        // If not weather-related, generate a response using Gemini
        const result = await model.generateContent(userMessage);
        const botResponse = result.response.text();
        res.json({ reply: botResponse });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ reply: 'Sorry, I encountered an error. Please try again.' });
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

        const imagePath = `http://localhost:${port}/uploads/${req.file.filename}`;

        // Insert blog and return created_at
        const query = `
            INSERT INTO blogs (user_id, description, image_url)
            VALUES ($1, $2, $3)
            RETURNING id, description, image_url, user_id, created_at
        `;
        const values = [user_id, description, imagePath];
        const result = await pool.query(query, values);
        const newBlog = result.rows[0]; 

        // Get the username
        const userQuery = 'SELECT username FROM users WHERE id = $1';
        const userResult = await pool.query(userQuery, [user_id]);
        const username = userResult.rows[0].username;

        res.status(201).send({
            message: 'Blog post created successfully!',
            blog: {
                id: newBlog.id,
                user_id: newBlog.user_id,
                description: newBlog.description,
                image_url: newBlog.image_url,
                created_at: newBlog.created_at,
                username, // Include username in the response
            },
        });
        console.log('New blog response:', {
            id: newBlog.id,
            user_id: newBlog.user_id,
            description: newBlog.description,
            image_url: newBlog.image_url,
            created_at: newBlog.created_at,
            username,
        });
    } catch (err) {
        console.error('Error inserting blog into database:', err);
        res.status(500).send('Server Error: ' + err.message);
    }
});

// In your /api/blogs GET endpoint
app.get('/api/blogs', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT blogs.id, blogs.description, blogs.image_url, users.username, blogs.created_at
            FROM blogs
            JOIN users ON blogs.user_id = users.id
            ORDER BY blogs.id DESC
        `);
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