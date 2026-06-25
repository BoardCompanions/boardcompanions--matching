exports.handler = async function(event, context) {
  const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY3NDc2NTk3OCwiYWFpIjoxMSwidWlkIjoxMDQ2MTY2MzMsImlhZCI6IjIwMjYtMDYtMjRUMTA6NDg6MzkuNzcwWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjM1Mzk4NTM2LCJyZ24iOiJldWMxIn0.2PmOez-KyimI6xQIlCVo4xZugFR6nYr0_cpe_STl8B4";

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ''
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": API_KEY,
        "API-Version": "2024-01"
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();
    
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
      },
      body: text
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
};
