
// require('dotenv').config(); // Load environment variables from .env file

// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Unauthorized: Token missing or malformed' });
//     }

//     const token = authHeader.split(' ')[1]; // Extract the token
//     console.log('Token being verified:', token); // In authMiddleware.js
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the secret from .env
//         req.user = decoded; // Attach decoded data to the request
//         next(); // Proceed to the next middleware
//     } catch (err) {
//         console.error('Token verification error:', err.message);
//         res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }
// };

// module.exports = authenticate;


const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to the request
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authMiddleware;

