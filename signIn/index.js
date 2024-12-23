const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "travel_easy",
    password: "db123",
    port: 5432,                  
});


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
        res.json({ token: 'dummy-token' }); 
    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



