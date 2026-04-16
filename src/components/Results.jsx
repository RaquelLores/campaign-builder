export default function Results({ filtered }) {
  return (
    <div>
      <h2>Segment Results: {filtered.length}</h2>

      <ul>
        {filtered.map((u, i) => (
          <li key={i}>
            {u.name} - {u.age} - {u.country}
          </li>
        ))}
      </ul>
    </div>
  );
}