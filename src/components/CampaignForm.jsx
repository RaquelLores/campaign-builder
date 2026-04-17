export default function CampaignForm({ users, setFiltered, saveCampaign }) {

  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const campaignName = form.get("campaignName");
    const minAge = Number(form.get("minAge"));
    const maxAge = Number(form.get("maxAge"));
    const gender = form.get("gender");
    const country = form.get("country").trim().toLowerCase();

    const result = users.filter(u =>
      (!minAge || u.age >= minAge) &&
      (!maxAge || u.age <= maxAge) &&
      (!gender || u.gender === gender) &&
      (!country || u.country.toLowerCase().includes(country))
    );

    setFiltered(result);
    saveCampaign(
      campaignName,
      {
        minAge: form.get("minAge"),
        maxAge: form.get("maxAge"),
        gender,
        country: form.get("country"),
      },
      result.length
    );
  }

  return (
    <form className="campaign-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="field field--full">
          <label htmlFor="campaignName">Campaign label</label>
          <input
            id="campaignName"
            name="campaignName"
            placeholder="Spring launch, loyalty push, Nordic readers..."
          />
        </div>

        <div className="field">
          <label htmlFor="minAge">Minimum age</label>
          <input id="minAge" name="minAge" type="number" placeholder="18" />
        </div>

        <div className="field">
          <label htmlFor="maxAge">Maximum age</label>
          <input id="maxAge" name="maxAge" type="number" placeholder="65" />
        </div>

        <div className="field">
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" defaultValue="">
            <option value="">All subscribers</option>
            <option value="male">Men</option>
            <option value="female">Women</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="country">Country contains</label>
          <input
            id="country"
            name="country"
            placeholder="Spain, Sweden, Brazil..."
          />
        </div>

        <div className="actions">
          <button className="button-primary" type="submit">
            Segment audience
          </button>
        </div>
      </div>
    </form>
  );
}
