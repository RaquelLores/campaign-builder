export default function Results({ filtered }) {
  return (
    <div className="results">
      <div className="results__header">
        <span className="results__eyebrow">Live Output</span>
        <h2>Segment results</h2>
        <p className="results__meta">
          {filtered.length} subscriber{filtered.length === 1 ? "" : "s"} match
          the current filters.
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="results__empty">
          No subscribers match this segment yet. Try widening the age range or
          removing a filter.
        </p>
      ) : (
        <ul className="results-list">
          {filtered.map((u, i) => (
            <li key={`${u.name}-${u.country}-${i}`} className="result-card">
              <div className="result-card__header">
                <strong>{u.name}</strong>
                <span className="pill">{u.gender}</span>
              </div>

              <div className="result-card__meta">
                <span className="meta-chip">{u.age} years</span>
                <span className="meta-chip">{u.country}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
