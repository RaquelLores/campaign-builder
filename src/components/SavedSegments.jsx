export default function SavedSegments({ campaigns, onDeleteCampaign }) {
  return (
    <aside className="panel">
      <div className="panel__header">
        <span className="panel__eyebrow">Saved Segments</span>
        <h2>Recent campaign snapshots</h2>
        <p>
          Stored locally so you can compare rough audience sizes while testing
          new combinations.
        </p>
      </div>

      {campaigns.length === 0 ? (
        <p className="saved-empty">
          Save a filtered audience and it will appear here.
        </p>
      ) : (
        <ul className="saved-list">
          {campaigns.map((campaign, index) => (
            <li key={`${campaign.name}-${index}`} className="saved-card">
              <div className="saved-card__header">
                <strong>{campaign.name}</strong>
                <div className="saved-card__actions">
                  <span className="pill">{campaign.count}</span>
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteCampaign(index)}
                    title="Delete this segment"
                    aria-label={`Delete ${campaign.name}`}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="saved-card__meta">
                {campaign.filters?.minAge ? (
                  <span className="meta-chip">
                    Min age {campaign.filters.minAge}
                  </span>
                ) : null}
                {campaign.filters?.maxAge ? (
                  <span className="meta-chip">
                    Max age {campaign.filters.maxAge}
                  </span>
                ) : null}
                {campaign.filters?.gender ? (
                  <span className="meta-chip">{campaign.filters.gender}</span>
                ) : null}
                {campaign.filters?.country ? (
                  <span className="meta-chip">{campaign.filters.country}</span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
