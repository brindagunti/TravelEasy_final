const crypto = require('crypto');

const generateKey = () => {
  return crypto.randomBytes(64).toString('hex'); // Generates a 64-byte random key
};

console.log(generateKey());
