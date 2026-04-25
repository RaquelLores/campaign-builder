export async function getUsers(sourceUrl = null, resultsCount = 50) {
  // Use custom URL if provided, otherwise default to randomuser.me
  const url = sourceUrl || `https://randomuser.me/api/?results=${resultsCount}`;
  
  const res = await fetch(url);
  const data = await res.json();

  // Support both randomuser.me API format and custom data
  const results = data.results || data;
  
  if (!Array.isArray(results)) {
    throw new Error('API response must contain an array of users');
  }

  return results.map(u => ({
    name: u.name?.first || u.name || 'Unknown',
    age: u.dob?.age || u.age || 0,
    country: u.location?.country || u.country || 'Unknown',
    gender: u.gender || 'other'
  }));
}