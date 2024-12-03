import { addSchool, getAllSchools } from '../models/schoolModel.js';
import { calculateDistance } from '../utils/distanceCalculator.js';

export async function addSchoolHandler(req, res) {
  const { name, address, latitude, longitude } = req.body;

  try {
    const schoolId = await addSchool(name, address, latitude, longitude);
    res.status(201).json({ message: 'School added successfully', schoolId });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add school' });
  }
}

export async function listSchoolsHandler(req, res) {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    const schools = await getAllSchools();

    const sortedSchools = schools
      .map((school) => ({
        ...school,
        distance: calculateDistance(latitude, longitude, school.latitude, school.longitude),
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch schools' });
  }
}
