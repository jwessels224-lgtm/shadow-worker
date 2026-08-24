const express = require('express');
const app = express();
app.use(express.json());

// --- CONFIG ---
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'shadow123';
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || '';

app.get('/', (req, res) => {
  res.send('Shadow Worker Live - Meta Ready');
});

// META WEBHOOK VERIFICATION - Dis wat Meta check!
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK VERIFIED!');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// INCOMING WHATSAPP MESSAGES
app.post('/webhook', (req, res) => {
  console.log('WhatsApp Message:', JSON.stringify(req.body, null, 2));
  // Hier gaan jy later jou AI logic insit
  res.sendStatus(200);
});

// STATUS vir jou Office AI om te check
app.get('/status', (req, res) => {
  res.json({
    live: true,
    whatsapp_token_valid: WHATSAPP_TOKEN.length > 10,
    verify_token: VERIFY_TOKEN,
    service: 'Shadow Worker Office AI'
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Shadow Worker listening on ${PORT}`));
