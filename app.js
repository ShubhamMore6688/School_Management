// Importing required modules
import express from 'express'; // Framework for building web applications
import schoolRoutes from './routes/schoolRoutes.js'; // Importing routes related to school functionalities
import { initializeDatabase } from "./config/db.js"; // Importing database initialization logic

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Route middleware for handling API requests related to schools
// All routes prefixed with '/api' will be handled by schoolRoutes
app.use('/api', schoolRoutes);

// Root route to check if the server is running
app.get('/', (req, res) => {
    res.json("server is listening"); // Respond with a simple message
});

// Define the server port, defaulting to 3000 if not set in environment variables
const PORT = process.env.PORT || 3000;

// Initialize the database before starting the server
initializeDatabase()
  .then(() => {
    // Start the server once the database is initialized
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`); // Log a message indicating the server is running
    });
  })
  .catch(error => {
    // Handle any errors that occur during database initialization
    console.error("Failed to initialize database:", error);
  });
