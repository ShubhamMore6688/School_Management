// Function to calculate the distance between two geographical points using the Haversine formula
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180; // Convert degrees to radians
  const R = 6371; // Radius of the Earth in kilometers

  const dLat = toRad(lat2 - lat1); // Difference in latitudes, converted to radians
  const dLon = toRad(lon2 - lon1); // Difference in longitudes, converted to radians

  // Haversine formula to calculate the great-circle distance
  const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) + // Square of half the latitude difference
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * // Cosine of latitudes
      Math.sin(dLon / 2) * Math.sin(dLon / 2); // Square of half the longitude difference

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Angular distance in radians

  return R * c; // Distance in kilometers
}
