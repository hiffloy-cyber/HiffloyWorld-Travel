exports.handler = async (event) => {
try {
const data = JSON.parse(event.body);

const ticket = {
email: data.email,
subject: `New Booking - ${data.destination}`,
description: `Name: ${data.name}\nEmail: ${data.email}\nDestination: ${data.destination}\nDate: ${data.date}`,
status: 2,
priority: 1
};

const auth = Buffer.from(process.env.FRESHDESK_API_KEY + ":X").toString("base64");

const response = await fetch(`https://${process.env.FRESHDESK_DOMAIN}/api/v2/tickets`, {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": "Basic " + auth
},
body: JSON.stringify(ticket)
});

const result = await response.json();

return {
statusCode: 200,
body: JSON.stringify(result)
};

} catch (err) {
return {
statusCode: 500,
body: JSON.stringify({ error: err.message })
};
}
};
