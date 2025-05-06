const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur de connexion à OpenAI' });
  }
});

// Correction : Une seule déclaration du port
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Serveur UniSign connecté à ChatGPT sur http://localhost:${port}`);
});



