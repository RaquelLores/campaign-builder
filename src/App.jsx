import { useEffect, useState } from "react";
import { getUsers } from "./services/api";
import CampaignForm from "./components/CampaignForm";
import Results from "./components/Results";
import SavedSegments from "./components/SavedSegments";

function App() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [campaigns, setCampaigns] = useState(
    JSON.parse(localStorage.getItem("campaigns")) || []
  );

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setFiltered(data);
    });
  }, []);

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
            </div>

            <SavedSegments campaigns={campaigns} />
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
