const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

const app = express();
app.use(express.json());

// Route API pour gérer les messages
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Faire la requête vers l'API OpenAI pour obtenir la réponse du chatbot
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.gitignore.env.OPENAI_API_KEY}`, // Utilisation de la clé API stockée dans .env
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }],
      }),
    });

    const data = await response.json();
    // Retourner la réponse générée par OpenAI
    res.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Erreur de connexion à OpenAI' });
  }
});

// Lancer le serveur
const port = process.gitignore.env.PORT || 3000; // Utiliser le port configuré sur Vercel
app.listen(port, () =>



