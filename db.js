const { Pool } = require('pg');

// Configure the connection pool for PostgreSQL
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "travel_easy",
    password: "db123",
    port: 5432,                   // default PostgreSQL port
});

// Export the pool for use in your other files
module.exports = pool;
