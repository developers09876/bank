// import admin from "../../firebase-config.js";
// import User from "../model/UserNotification.js";

// // Save device token
// export const saveDeviceToken = async (req, res) => {
//   const { name, deviceToken } = req.body;

//   // Validate input
//   if (!name || !deviceToken) {
//     return res
//       .status(400)
//       .json({ message: "Name and device token are required" });
//   }

//   try {
//     // Save or update the user's device token
//     const user = await User.findOneAndUpdate(
//       { name },
//       { deviceToken },
//       { upsert: true, new: true }
//     );

//     return res
//       .status(200)
//       .json({ message: "Device token saved successfully", user });
//   } catch (error) {
//     console.error("Error saving token:", error);
//     return res
//       .status(500)
//       .json({ message: "Error saving token", error: error.message });
//   }
// };

// export const sendNotification = async (req, res) => {
//   const { title, body, userId, image, data } = req.body;

//   // Validate required fields
//   if (!title || !body || !userId || !image) {
//     return res.status(400).json({
//       message: "Title, body, userId, and image are required",
//     });
//   }

//   try {
//     // Fetch the user and check if the device token exists
//     const user = await User.findById(userId);
//     if (!user || !user.deviceToken) {
//       return res.status(404).json({
//         message: "User not found or device token is missing",
//       });
//     }

//     // Log the device token for debugging
//     console.log("Sending notification to token:", user.deviceToken);

//     // Construct the notification message
//     const message = {
//       token: user.deviceToken,
//       notification: {
//         title,
//         body,
//         image,
//       },
//       data: {
//         ...data, // Ensure custom data is included correctly
//       },
//     };

//     // Log the message payload for debugging
//     console.log("Notification payload:", message);

//     // Send the notification using Firebase Admin SDK
//     const response = await admin.messaging().send(message);

//     return res.status(200).json({
//       message: "Notification sent successfully",
//       response,
//     });
//   } catch (error) {
//     // Handle invalid token errors specifically
//     if (error.code === "messaging/invalid-registration-token") {
//       console.error("Invalid token detected for user:", {
//         userId,
//         deviceToken: user?.deviceToken || "No token",
//       });

//       // Remove the invalid token from the database
//       await User.findByIdAndUpdate(userId, { deviceToken: null });

//       return res.status(400).json({
//         message: "Invalid FCM token. Please refresh your device token.",
//       });
//     }

//     // Handle all other errors
//     console.error("Error sending notification:", error);

//     return res.status(500).json({
//       message: "Error sending notification",
//       error: error.message,
//     });
//   }
// };
