exports.handler = async function(event, context) {
  const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjY3NDc2NTk3OCwiYWFpIjoxMSwidWlkIjoxMDQ2MTY2MzMsImlhZCI6IjIwMjYtMDYtMjRUMTA6NDg6MzkuNzcwWiIsInBlciI6Im1lOndyaXRlIiwiYWN0aWQiOjM1Mzk4NTM2LCJyZ24iOiJldWMxIn0.2PmOez-KyimI6xQIlCVo4xZugFR6nYr0_cpe_STl8B4";

  try {
    const body = JSON.parse(event.body);
    
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": API_KEY
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
      },
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
