/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest, onCall} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.firstFunction = onRequest((req, res) => {
  const message = req.query.message;
  logger.info("LOGS TEST", message);
  res.send(`Hello from on request cloud function : your message is ${message}`);
});

exports.firstOnCallFunction = onCall((req, context) => {
  const message = req.message;
  return {
    response: `Hello from on call cloud function : your message is ${message}`,
  };
});
