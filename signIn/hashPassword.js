// hashPassword.js
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const saltRounds = 10; // Number of rounds to use for salt generation
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log('Hashed Password:', hashedPassword);
    process.exit(); // Exit the process after logging
}

hashPassword('yourPassword'); // Replace 'yourPassword' with the password you want to hash
