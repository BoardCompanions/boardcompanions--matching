exports.handler = async function(event, context) {
  const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY3NDc2NTk3OCwiYWFpIjoxMSwidWlkIjoxMDQ2MTY2MzMsImlhZCI6IjIwMjYtMDYtMjRUMTA6NDg6MzkuNzcwWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjM1Mzk4NTM2LCJyZ24iOiJldWMxIn0.2PmOez-KyimI6xQIlCVo4xZugFR6nYr0_cpe_STl8B4";

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" }, body: '' };
  }

  try {
    // Always use the full companions query
    const query = `{ boards(ids: [5099121389]) { items_page(limit: 500) { items { id name column_values { id text } } } } }`;
    
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": API_KEY },
      body: JSON.stringify({ query })
    });

    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
};
