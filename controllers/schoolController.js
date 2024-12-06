// Import functions for interacting with the database and utility for calculating distances
import { addSchool, getAllSchools } from '../models/schoolModel.js';
import { calculateDistance } from '../utils/distanceCalculator.js';

// Handler to add a new school
export async function addSchoolHandler(req, res) {
  const { name, address, latitude, longitude } = req.body; // Extract school details from the request body

  try {
    const schoolId = await addSchool(name, address, latitude, longitude); // Add school to the database
    res.status(201).json({ message: 'School added successfully', schoolId }); // Respond with success message and school ID
  } catch (error) {
    res.status(500).json({ error: 'Failed to add school' }); // Respond with an error if operation fails
  }
}

// Handler to list all schools sorted by proximity to given coordinates
export async function listSchoolsHandler(req, res) {
  const { latitude, longitude } = req.query; // Extract coordinates from query parameters

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' }); // Validate that coordinates are provided
  }

  try {
    const schools = await getAllSchools(); // Retrieve all schools from the database

    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: calculateDistance(latitude, longitude, school.latitude, school.longitude), // Calculate distance to each school
      }))
      .sort((a, b) => a.distance - b.distance); // Sort schools by distance in ascending order

    res.status(200).json(sortedSchools); // Respond with the sorted list of schools
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch schools' }); // Respond with an error if operation fails
  }
}
