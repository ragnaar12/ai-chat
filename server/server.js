const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // Charger les variables d'environnement depuis le fichier .env

const app = express();
const port = process.env.PORT || 3000; // Utilisation du port configuré dans l'environnement, sinon 3000

app.use(express.json());

// Route API pour gérer les messages
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  console.log('Message reçu:', userMessage); // Affiche le message reçu

  try {
    // Faire la requête vers l'API OpenAI pour obtenir la réponse du chatbot
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Utilisation de la clé API stockée dans .env
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', // Choix du modèle
        messages: [{ role: 'user', content: userMessage }], // Contenu du message de l'utilisateur
      }),
    });

    const data = await response.json();
    console.log('Réponse de l\'API OpenAI:', data); // Affiche la réponse de l'API

    if (data.choices && data.choices.length > 0) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'Aucune réponse reçue de l\'API OpenAI' });
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
});


});



