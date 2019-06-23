import firebase from 'firebase/app';
import 'firebase/messaging';

import './index.css';

const displayNotification = (title, body) => new Notification(title, { body });

const sendTokenToServer = (token) => {
  if (!token) {
    return;
  }

  fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'content-type': 'application/json',
    },
  });
};

const initializeFCM = () => {
  firebase.initializeApp({
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
  });

  const messaging = firebase.messaging();

  messaging.usePublicVapidKey(process.env.PUBLIC_VAPID_KEY);

  messaging.getToken()
    .then(token => sendTokenToServer(token))
    .catch(err => console.error('An error occurred while retrieving token. ', err));

  messaging.onMessage((payload) => {
    const { body = 'No Body', title = 'No Title' } = payload.notification;

    displayNotification(title, body);
  });
};

Notification.requestPermission().then((permission) => {
  if (permission !== 'granted') {
    console.log('Unable to get permission to notify.');
    return;
  }

  initializeFCM();
});
