const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.COHERE_API_KEY;

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "command-r",
        message: message,
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    res.json({ reply: data.text || "Aucune réponse" });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur: " + error.message });
  }
});

app.get("/", (req, res) => {
  res.send("UniChat Backend fonctionne !");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});





