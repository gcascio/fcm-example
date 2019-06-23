const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const PORT = 5000;

admin.initializeApp({
  credential: admin.credential.cert(path.join(__dirname, './service_account.json')),
});

const defaultMessaging = admin.messaging();

const sendNotification = (token, notification) => {
  try {
    defaultMessaging.send({
      notification,
      token,
    });
  } catch (e) {
    console.error(e);
  }
};

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use(bodyParser.json());

app.post('/subscribe', (req, res) => {
  const { token = null } = req.body;
  console.log(token);

  if (!token) {
    res.status(400).json({ error: 'No token provided' });
    return;
  }

  res.status(201).end();

  sendNotification(token, { title: 'Test', body: 'Push test' });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
