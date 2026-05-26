const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(express.json());

/* =========================
   ROOT
========================= */

app.get("/", (req, res) => {
  res.send("SHOWY WHATSAPP SERVER RUNNING 🚀");
});

/* =========================
   SEND WHATSAPP
========================= */

app.post("/send-whatsapp", async (req, res) => {

  try {

    const phone = req.body.phone;
    const message = req.body.message;

    console.log("PHONE:", phone);
    console.log("MESSAGE:", message);

    const url =
      `https://graph.facebook.com/v25.0/${process.env.PHONE_NUMBER_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: phone,
      type: "text",
      text: {
        body: message
      }
    };

    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json"
    };

    const response = await axios({
      method: "POST",
      url: url,
      headers: headers,
      data: payload
    });

    console.log("SUCCESS ✅");
    console.log(response.data);

    res.json({
      success: true,
      data: response.data
    });

  }

  catch (error) {

    console.log("ERROR ❌");

    console.log(
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message
    });

  }

});

/* =========================
   START SERVER
========================= */

app.listen(3000, () => {

  console.log("================================");
  console.log("SHOWY WHATSAPP SERVER STARTED 🚀");
  console.log("RUNNING ON PORT 3000");
  console.log("================================");

});