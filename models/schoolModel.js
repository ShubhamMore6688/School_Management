// Import the database connection pool
import { pool } from "../config/db.js";

// Function to add a new school to the database
export async function addSchool(name, address, latitude, longitude) {
  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)'; // SQL query to insert school details
  const [result] = await pool.execute(query, [name, address, latitude, longitude]); // Execute the query with provided values
  return result.insertId; // Return the ID of the newly inserted school
}

// Function to retrieve all schools from the database
export async function getAllSchools() {
  const query = 'SELECT * FROM schools'; // SQL query to fetch all school records
  const [rows] = await pool.query(query); // Execute the query and get the result rows
  return rows; // Return the list of schools
}
