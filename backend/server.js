const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await fetch('https://api.cohere.ai/v1/chat', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'command-r',
                message: userMessage,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        const data = await response.json();

        if (!data?.text) {
            return res.status(500).json({ error: 'Réponse vide de Cohere.' });
        }

        res.json({ reply: data.text });

    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ error: 'Erreur de traitement côté serveur.' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en ligne sur http://localhost:${PORT}`);
});




