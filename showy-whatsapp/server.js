const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

/* ================================
   MIDDLEWARE
================================ */

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

/* ================================
   TEST ROUTE
================================ */

app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "SHOWY WhatsApp API Working 🚀"
  });

});

/* ================================
   SEND WHATSAPP
================================ */

app.post("/send-whatsapp", async (req, res) => {

  try {

    console.log("=================================");
    console.log("BODY RECEIVED:");
    console.log(req.body);
    console.log("=================================");

    const phone = req.body.phone;
    const message = req.body.message;

    /* VALIDATION */

    if (!phone || !message) {

      return res.status(400).json({
        success: false,
        error: "Phone and message are required"
      });

    }

    /* WHATSAPP API CALL */

    const response = await axios.post(

      `https://graph.facebook.com/v22.0/${process.env.PHONE_NUMBER_ID}/messages`,

      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: {
          body: message
        }
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }

    );

    console.log("=================================");
    console.log("WHATSAPP SENT SUCCESSFULLY 🚀");
    console.log(response.data);
    console.log("=================================");

    res.json({
      success: true,
      whatsapp_response: response.data
    });

  } catch (error) {

    console.log("=================================");
    console.log("WHATSAPP ERROR");
    console.log("=================================");

    if (error.response) {

      console.log(error.response.data);

      return res.status(500).json({
        success: false,
        error: error.response.data
      });

    } else {

      console.log(error.message);

      return res.status(500).json({
        success: false,
        error: error.response?.data || error.message
      });

    }

  }

});

/* ================================
   SERVER START
================================ */

app.listen(3000, () => {

  console.log("=================================");
  console.log("SERVER STARTED 🚀");
  console.log("http://127.0.0.1:3000");
  console.log("=================================");

});