import { useEffect, useState } from "react";
import { getUsers } from "./services/api";
import CampaignForm from "./components/CampaignForm";
import Results from "./components/Results";

function App() {const [users, setUsers] = useState([]);
const [filtered, setFiltered] = useState([]);

const [campaigns, setCampaigns] = useState(
JSON.parse(localStorage.getItem("campaigns")) || []
);

useEffect(() => {
getUsers().then(setUsers);
}, []);

function saveCampaign(name) {
const newCampaign = { name, count: filtered.length };

const updated = [...campaigns, newCampaign];
setCampaigns(updated);

localStorage.setItem("campaigns", JSON.stringify(updated));

}

return (
  <div>
    <h1>Subscriber Segmentation Tool</h1>

    <CampaignForm 
      users={users} 
      setFiltered={setFiltered}
      saveCampaign={saveCampaign}
    />

    <Results filtered={filtered} />
  </div>
);

}

export default App;