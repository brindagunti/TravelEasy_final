require('dotenv').config();

const nodemailer = require("nodemailer");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { GoogleGenerativeAI } = require('@google/generative-ai');
// Initialize the app
const app = express();
const port = 3000;  // Adjust the port if needed
app.use(express.static(path.join(__dirname)));
const NEWS_API_KEY = 'db50a9545dce449097eb04a0604d764c';
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=travel%20places&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

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



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER, // Your email from .env
        pass: process.env.GMAIL_PASS, // App password from .env
    },
    port: 465,
    secure: true,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
});

// Function to send emails
const sendWelcomeEmail = async (to) => {
    const mailOptions = {
        from: process.env.GMAIL_USER, // Sender address
        to, // Recipient's email
        subject: "Welcome to Travel Easy!",
        text: "Thank you for signing up for Travel Easy. We're excited to have you on board! Start exploring amazing travel destinations today.",
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Welcome email sent successfully:", info.response);
    } catch (err) {
        console.error("Error in sending welcome email:", err);
    }
};

// Signup route
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const userCheckQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const userCheckResult = await pool.query(userCheckQuery, [username, email]);

        if (userCheckResult.rows.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        const insertQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
        const insertResult = await pool.query(insertQuery, [username, email, hashedPassword]);

        const newUser = insertResult.rows[0];

        // Generate JWT token
        const token = jwt.sign({ id: newUser.id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send welcome email
        await sendWelcomeEmail(email);

        console.log('Sign-up successful:', newUser);
        res.json({ message: 'User created', token, username: newUser.username });
    } catch (error) {
        console.error('Error during sign-up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST route for user sign-in
app.post('/signin', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    try {
        // Check if user exists
        const query = 'SELECT * FROM users WHERE username = $1 OR email = $2';
        const result = await pool.query(query, [usernameOrEmail, usernameOrEmail]);
        const user = result.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('Token being signed:', token); // Debugging token
            res.json({ message: 'Signin successful', token, username: user.username,email: user.email });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//chatbot 

// API Keys
const genAI = new GoogleGenerativeAI("AIzaSyDyTQ4khLwCIxGxS-HBEAcXsbZv55_4LdU");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// OpenWeather API key
const openWeatherApiKey = 'a964ba63f2b5351bd744cfc09f7c2a1f';

// Serve static files like HTML, CSS, and JS from the 'public' folder
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Helper function to fetch weather data
async function getWeather(city) {
    try {
        // Example using OpenWeatherMap API (replace with your preferred API)
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
        const data = await response.json();
        if (data.weather) {
            return `The weather in ${city} is ${data.weather[0].description}.`;
        } else {
            return `Sorry, I couldn't find weather information for ${city}.`;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return "Error fetching weather information.";
    }
}

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        if (!userMessage) {
            return res.status(400).json({ reply: "Message cannot be empty." });
        }

        // Weather Handling Block
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

        const result = await model.generateContent(userMessage);
        console.log('Full Gemini API Response:', JSON.stringify(result, null, 2));

        const candidate = result?.response?.candidates?.[0];
let botResponse = candidate?.content?.parts?.[0]?.text;

if (botResponse) {

    botResponse = botResponse
        .replace(/^(.+):$/gm, '<h4>$1</h4>')              
        .replace(/^\*\s(.+)$/gm, '<li>$1</li>')            
        .replace(/(?:<\/li>\n)+/g, '</li>')               
        .replace(/\n\n+/g, '</ul><ul>')                
        .replace(/^(?!<b>|<\/?ul>|<\/?li>)(.+)$/gm, '<p>$1</p>') 
        .replace(/<\/b>\s*(?!<ul>)/g, '</b><ul>');       

    // Wrap the entire response in a container
    botResponse = `<div>${botResponse}</div>`;
    return res.json({ reply: botResponse });
}

        throw new Error('Invalid response structure from Gemini API.');

    } catch (error) {
        console.error('Error generating response:', error.message);
        res.status(500).json({ reply: 'Sorry, I encountered an error. Please try again.' });
    }
});


// -------------- BLOG POSTS UPLOADS --------------
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './uploads/')); // Save files in the /uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save with a timestamp and original extension
    }
});

const upload = multer({ storage: storage });

// Middleware to secure routes
const authenticate = require('./authMiddleware'); // Ensure this points to your middleware file

// Secure route for creating a new blog post
app.post('/api/blogs', authenticate, upload.single('image'), async (req, res)   => {
    console.log('POST /api/blogs route hit');
    try {
        const { description } = req.body;
        const user_id = req.user.id; // Extract user ID from the authenticated token

        if (!req.file) {
            console.error('No file uploaded.');
            return res.status(400).send('No file uploaded.');
        }

        console.log('File Uploaded:', req.file);
        console.log('Request Body:', req.body);

        const imagePath = `http://localhost:${port}/uploads/${req.file.filename}`;
        const query = `
            INSERT INTO blogs (user_id, description, image_url)
            VALUES ($1, $2, $3)
            RETURNING id, description, image_url, user_id, created_at
        `;
        const values = [user_id, description, imagePath];
        const result = await pool.query(query, values);
        console.log('Insert Query Result:', result.rows);

        res.status(201).send({
            message: 'Blog post created successfully!',
            blog: {
                id: result.rows[0].id,
                user_id: result.rows[0].user_id,
                description: result.rows[0].description,
                image_url: result.rows[0].image_url,
                created_at: result.rows[0].created_at,
                username: req.user.username, // Retrieve username from the token
            },
        });
    } catch (err) {
        console.error('Error inserting blog into database:', err);
        res.status(500).send('Server Error: ' + err.message);
    }
});

// Secure route for fetching all blog posts
app.get('/api/blogs', authenticate, async (req, res) => {
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

// Secure route for fetching blogs by the logged-in user
app.get('/api/user-blogs', authenticate, async (req, res) => {
    try {
        const userId = req.user.id; // Extract the user's ID from the authenticated token
        const result = await pool.query(
            `SELECT id, description, image_url, created_at FROM blogs WHERE user_id = $1 ORDER BY id DESC`,
            [userId]
        );
        res.status(200).send(result.rows);
    } catch (err) {
        console.error('Error fetching user blogs from database:', err);
        res.status(500).send('Server Error: ' + err.message);
    }
});


// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  //News 
app.get('/api/travel-news', async (req, res) => {
    const query = req.query.query || 'travel';
    const NEWS_API_URL = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

    try {
        const response = await axios.get(NEWS_API_URL);

        const filteredArticles = response.data.articles.filter(article => article.urlToImage);
        
        if (filteredArticles.length === 0) {
            return res.status(404).json({ error: "No articles with images found" });
        }

        res.json(filteredArticles);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news. Please try again later.' });
    }
});


  app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
  });