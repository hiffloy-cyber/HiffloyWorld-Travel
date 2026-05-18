exports.handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No booking data received" })
      };
    }

    const { name, email, destination, date } = JSON.parse(event.body);

    const response = await fetch(
      `https://${process.env.FRESHDESK_DOMAIN}/api/v2/tickets`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            "Basic " +
            Buffer.from(process.env.FRESHDESK_API_KEY + ":X").toString("base64")
        },
        body: JSON.stringify({
          subject: `New Booking from ${name}`,
          email: email,
          priority: 2,
          status: 2,
          description: `
Name: ${name}
Email: ${email}
Destination: ${destination}
Date: ${date}
          `
        })
      }
    );

    const result = await response.json();

    console.log("Freshdesk response:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Ticket created successfully",
        data: result
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
