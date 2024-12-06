// Middleware function to validate the school data in the request body
export function validateSchoolData(req, res, next) {
  const { name, address, latitude, longitude } = req.body; // Extract school details from the request body

  // Check if all required fields are present
  if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'All fields are required' }); // Respond with error if any field is missing
  }

  // Check if latitude and longitude are numbers
  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ error: 'Latitude and longitude must be numbers' }); // Respond with error if types are incorrect
  }

  next(); // Proceed to the next middleware or route handler if validation passes
}
