// Import the MySQL library for database connections
import mysql from "mysql2/promise";

// Create a connection pool for database interactions
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Database host (from environment variables)
  user: process.env.DB_USER, // Database user (from environment variables)
  password: process.env.DB_PASS, // Database password (from environment variables)
  database: process.env.DB_NAME, // Database name (from environment variables)
  waitForConnections: true, // Allow waiting for available connections
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // No limit for queued connection requests
});

// Function to create the "schools" table if it doesn't exist
async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools ( 
      id INT AUTO_INCREMENT PRIMARY KEY, // Auto-incrementing primary key for school IDs
      name VARCHAR(255) NOT NULL, // School name (required)
      address VARCHAR(255) NOT NULL, // School address (required)
      latitude FLOAT NOT NULL, // Latitude of the school (required)
      longitude FLOAT NOT NULL // Longitude of the school (required)
    );
  `;
  const connection = await pool.getConnection(); // Get a connection from the pool
  try {
    await connection.query(`USE ${process.env.DB_NAME}`); // Ensure the correct database is selected
    await connection.query(createTableQuery); // Execute the query to create the table
    console.log("Table 'schools' is ready!"); // Log success message
  } catch (error) {
    console.error("Error initializing database:", error.message); // Log error message if something fails
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

// Export the connection pool and database initialization function
export { pool, initializeDatabase };
