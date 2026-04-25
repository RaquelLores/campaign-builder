import { useEffect, useState } from "react";
import { getUsers } from "./services/api";
import CampaignForm from "./components/CampaignForm";
import Results from "./components/Results";
import SavedSegments from "./components/SavedSegments";

const DATA_SOURCES = [
  {
    name: "Random Users (50)",
    url: "https://randomuser.me/api/?results=50"
  },
  {
    name: "Random Users (100)",
    url: "https://randomuser.me/api/?results=100"
  },
  {
    name: "Random Users (25)",
    url: "https://randomuser.me/api/?results=25"
  }
];

function App() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [campaigns, setCampaigns] = useState(
    JSON.parse(localStorage.getItem("campaigns")) || []
  );
  const [selectedSource, setSelectedSource] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDataSource(DATA_SOURCES[selectedSource].url);
  }, []);

  async function loadDataSource(url) {
    setLoading(true);
    setError("");
    try {
      const data = await getUsers(url);
      setUsers(data);
      setFiltered(data);
    } catch (err) {
      setError(`Failed to load data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function handleSourceChange(e) {
    const index = parseInt(e.target.value);
    setSelectedSource(index);
    loadDataSource(DATA_SOURCES[index].url);
  }

  function saveCampaign(name, filters, count) {
    const safeName = name?.trim() || `Segment ${campaigns.length + 1}`;
    const newCampaign = {
      name: safeName,
      count,
      filters,
    };
    const updated = [newCampaign, ...campaigns];

    setCampaigns(updated);
    localStorage.setItem("campaigns", JSON.stringify(updated));
  }

  function deleteCampaign(index) {
    const updated = campaigns.filter((_, i) => i !== index);
    setCampaigns(updated);
    localStorage.setItem("campaigns", JSON.stringify(updated));
  }

  return (
    <main className="app-shell">
      <div className="app-frame">
        <div className="app-grid">
          <section className="hero">
            <div className="hero__copy">
              <span className="hero__eyebrow">The right audience with the right message</span>
              <h1>Audience segmentation.</h1>
              <p>
                  Load your contact list, build precise audience segments, and save them with
                  clear names so you can compare groups, plan better follow-ups, and send the
                  right message to the right people.
              </p>

            </div>

            <div className="hero__stats" aria-label="Project summary">
              <div className="stat-card">
                <span>Profiles loaded</span>
                <strong>{users.length}</strong>
              </div>
              <div className="stat-card">
                <span>Current segment</span>
                <strong>{filtered.length}</strong>
              </div>
            </div>
          </section>

          <section className="dashboard">
            <div className="panel">
              <div className="panel__header">
                <span className="panel__eyebrow">Data Source</span>
                <h2>Select your contact list</h2>
                <p>
                  Choose a data source to segment your audience by.
                </p>
              </div>

              <div className="source-selector">
                <label htmlFor="dataSource">Contact List:</label>
                <select 
                  id="dataSource" 
                  value={selectedSource} 
                  onChange={handleSourceChange}
                  disabled={loading}
                >
                  {DATA_SOURCES.map((source, index) => (
                    <option key={index} value={index}>
                      {source.name}
                    </option>
                  ))}
                </select>
                {loading && <p className="loading-text">Loading...</p>}
                {error && <p className="error-text">{error}</p>}
              </div>
            </div>

            <SavedSegments campaigns={campaigns} onDeleteCampaign={deleteCampaign} />
          </section>

          <section className="panel">
            <div className="panel__header">
              <span className="panel__eyebrow">Audience Filters</span>
              <h2>Build a campaign segment</h2>
              <p>
                Your target audience is just a few clicks away. Use the filters to narrow down your contact list.
              </p>
            </div>

            <CampaignForm
              users={users}
              setFiltered={setFiltered}
              saveCampaign={saveCampaign}
            />
          </section>

          <section className="panel">
            <Results filtered={filtered} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;
