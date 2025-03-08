/* eslint-disable */

const {onRequest, onCall} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const {initializeApp, applicationDefault} = require("firebase-admin/app");

const {getFirestore, FieldValue} = require("firebase-admin/firestore");
const {getMessaging} = require("firebase-admin/messaging");


initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
const messaging = getMessaging();

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

exports.registerFCMToken = onCall(async (req) => {
  try {
    logger.info("FCM Req Log", req.data);

    const {clientType, mobileNumber, token} = req.data;

    if (!clientType || !mobileNumber || !token) {
      return {message: "invalidField"};
    }
    const collectionName =
    clientType === "shopManager" || clientType === "shopCustomer" ?
    "shops" :
    clientType;
    const dbRef = db.collection(collectionName).doc(mobileNumber);
    const docSnap = await dbRef.get();
    const existingData = docSnap.exists ? docSnap.data() : {};

    const tokenField =
    clientType === "shopManager" ?
    "shopManagerDeviceTokens" :
    clientType === "shopCustomer" ?
    "shopCustomerDeviceTokens" :
    "deviceTokens";
    logger.info("FCM Client and Token type", {clientType,tokenField});
    const updatedDeviceTokens = existingData[tokenField] ?
    [...new Set([...existingData[tokenField], token])] :
    [token];

    const updatedData = {[tokenField]: updatedDeviceTokens};

    await dbRef.set(updatedData, {merge: true});
    await db.collection("tokens").doc(clientType).set(
        {deviceTokens: FieldValue.arrayUnion(token)},
        {merge: true},
    );
    return {message: "success"};
  } catch (e) {
    logger.info("FCM Req Error", e);
    return {message: "error", error: e.message};
  }
});

exports.triggerPushNotification = onCall(async (req) => {
  try {
    const { deviceTokens, status, orderId } = req.data;
    logger.info("Push Notification request", req.data);
    if (!deviceTokens || !Array.isArray(deviceTokens) || !deviceTokens.length || !status || !orderId) {
      logger.info("Push Notification In valid field", req.data);
      throw new Error("Invalid field");
    }

    const notificationContent = {
      placed: "New Order Received!",
      updated: "Order Status Updated",
      cancelled: "Order Cancelled",
      completed: "Order Completed"
    };

    const message = {
      notification: {
        title: notificationContent[status] || "Order Update",
        body: "Tap to view order details",
      },
      data: { orderId: orderId, status},
      tokens: deviceTokens,
      android: {
        priority: "high",
        notification: {
          sound: "default",
          channelId: "default_channel_id",
        },
      },
    };

    const response = await messaging.sendEachForMulticast(message);

    return { success: true, response };
  } catch (e) {
    logger.info("Trigger Push Notification Failure", e);
    throw new Error("Failed to send notification");
  }
});

exports.deactivateFCMToken = onCall(async (req) => {
  try {
    logger.info("FCM Remove Req Log", req.data);

    const { clientType, mobileNumber, token } = req.data;

    if (!clientType || !mobileNumber || !token) {
      return { message: "invalidField" };
    }

    const collectionName =
      clientType === "shopManager" || clientType === "shopCustomer"
        ? "shops"
        : clientType;

    const tokenField =
      clientType === "shopManager"
        ? "shopManagerDeviceTokens"
        : clientType === "shopCustomer"
        ? "shopCustomerDeviceTokens"
        : "deviceTokens";

    await db.collection(collectionName).doc(mobileNumber).update({
      [tokenField]: FieldValue.arrayRemove(token),
    });

    await db.collection("tokens").doc(clientType).update({
      deviceTokens: FieldValue.arrayRemove(token),
    });

    return { message: "success" };
  } catch (e) {
    logger.error("FCM Remove Req Error", e);
    return { message: "error", error: e.message };
  }
});