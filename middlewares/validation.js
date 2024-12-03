export function validateSchoolData(req, res, next) {
    const { name, address, latitude, longitude } = req.body;
  
    if (!name || !address || !latitude || !longitude) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
    }
  
    next();
  }
  