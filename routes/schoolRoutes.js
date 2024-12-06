// Importing required modules and functions
import express from 'express'; // Framework for building web applications
import { addSchoolHandler, listSchoolsHandler } from '../controllers/schoolController.js'; 
// Handlers for managing school-related logic
import { validateSchoolData } from '../middlewares/validation.js'; 
// Middleware for validating incoming school data

// Create a router instance to define API routes
const router = express.Router();



// Description: Adds a new school to the database
router.post('/addSchool', validateSchoolData, addSchoolHandler);


// Retrieves a list of all schools from the database
router.get('/listSchools', listSchoolsHandler);

// Export the router to be used in the main application
export default router;
