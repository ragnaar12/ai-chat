const express = require('express');
const { OpenAI } = require('openai');
const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // remplace par ta vraie clé API OpenAI
});

app.use(express.json());

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: userMessage }],
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la communication avec ChatGPT');
  }
});

app.listen(port, () => {
  console.log(`Serveur UniSign connecté à ChatGPT sur http://localhost:${port}`);
});


app.listen(port, () => {
  console.log(`Serveur UniSign connecté à ChatGPT sur http://localhost:${port}`);
});

