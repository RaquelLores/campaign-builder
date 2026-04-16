export async function getUsers() {
  const res = await fetch('https://randomuser.me/api/?results=50');
  const data = await res.json();

  return data.results.map(u => ({
    name: u.name.first,
    age: u.dob.age,
    country: u.location.country,
    gender: u.gender
  }));
}