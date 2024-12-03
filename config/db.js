import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME, // Database name specified here
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to create the table
async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    );
  `;
  const connection = await pool.getConnection();
  try {
    // Ensure the database is selected
    await connection.query(`USE ${process.env.DB_NAME}`);
    await connection.query(createTableQuery);
    console.log("Table 'schools' is ready!");
  } catch (error) {
    console.error("Error initializing database:", error.message);
  } finally {
    connection.release();
  }
}

export { pool, initializeDatabase };
