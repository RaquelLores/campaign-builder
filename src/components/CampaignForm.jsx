export default function CampaignForm({ users, setFiltered }) {

  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const minAge = form.get("minAge");
    const maxAge = form.get("maxAge");
    const gender = form.get("gender");

    const result = users.filter(u =>
      (!minAge || u.age >= minAge) &&
      (!maxAge || u.age <= maxAge) &&
      (!gender || u.gender === gender)
    );

    setFiltered(result);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="minAge" placeholder="Minimum Age" />
      <input name="maxAge" placeholder="Maximum Age" />

      <select name="gender">
        <option value="">All</option>
        <option value="male">Men</option>
        <option value="female">Women</option>
      </select>

      <button type="submit">Segment Audience</button>
    </form>
  );
}