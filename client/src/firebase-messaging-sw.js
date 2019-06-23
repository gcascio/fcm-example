
import firebase from 'firebase/app';
import 'firebase/messaging';

firebase.initializeApp({
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
});

const messaging = firebase.messaging();

// If a notification field is present in the message payload,
// setBackgroundMessageHandler callback is not called,
// and instead the SDK displays a notification based on the payload.
messaging.setBackgroundMessageHandler((payload) => {
  const { body = 'No Body', title = 'No Title' } = payload.data;

  // eslint-config-airbnb forbids the use of the global variable self
  // which is the recommended way of accessing WorkerGlobalScope
  // eslint-disable-next-line no-restricted-globals
  return self.registration.showNotification(title, body);
});
