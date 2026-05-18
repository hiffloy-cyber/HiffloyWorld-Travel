exports.handler = async (event) => {
  try {
    const { name, email, destination, date } = JSON.parse(event.body);

    const response = await fetch(`https://${process.env.FRESHDESK_DOMAIN}/api/v2/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(process.env.FRESHDESK_API_KEY + ":X").toString("base64")
      },
      body: JSON.stringify({
        subject: `New Booking: ${destination}`,
        description: `
Name: ${name}
Email: ${email}
Destination: ${destination}
Date: ${date}
        `,
        email: email,
        priority: 2,
        status: 2
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
