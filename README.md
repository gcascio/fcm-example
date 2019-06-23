# FCM Example

Before you run this example you have to:

- add your firebase service account details as `service_account.json` to the root of the server directory.
- add a `.env` file with your `MESSAGING_SENDER_ID` and your `PUBLIC_VAPID_KEY` to the root of the client directory.
- run `yarn install` or `npm install` in the client and server directory

To run the example first build the client with `yarn build` and then start the server with `yarn start`.

You can reach the application under `http://localhost:5000`
