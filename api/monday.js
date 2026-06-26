export default async function handler(req, res) {
  const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY3NDc2NTk3OCwiYWFpIjoxMSwidWlkIjoxMDQ2MTY2MzMsImlhZCI6IjIwMjYtMDYtMjRUMTA6NDg6MzkuNzcwWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjM1Mzk4NTM2LCJyZ24iOiJldWMxIn0.2PmOez-KyimI6xQIlCVo4xZugFR6nYr0_cpe_STl8B4";

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const query = `{ boards(ids: [5099121389]) { items_page(limit: 500) { items { id name column_values { id text } } } } }`;
    
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": API_KEY
      },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
