const axios = require("axios");
require("dotenv").config();

console.log(process.env.WHATSAPP_TOKEN);

async function sendTest() {

  try {

    const response = await axios.post(

      `https://graph.facebook.com/v25.0/${process.env.PHONE_NUMBER_ID}/messages`,

      {
        messaging_product: "whatsapp",
        to: "918019951344",
        type: "text",
        text: {
          body: "SHOWY TEST MESSAGE 🚀"
        }
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }

    );

    console.log("SUCCESS ✅");
    console.log(response.data);

  }

  catch (error) {

    console.log("ERROR ❌");

    console.log(error.response?.data || error.message);

  }

}

sendTest();