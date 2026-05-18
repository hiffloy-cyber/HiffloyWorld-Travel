exports.handler = async (event) => {
  try {
    console.log("EVENT:", event.body);

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No data received" })
      };
    }

    const data = JSON.parse(event.body);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Function working",
        received: data
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };
  }
};
