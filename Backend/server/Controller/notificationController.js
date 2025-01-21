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
//   const { title, body, userId, image } = req.body;

//   if (!title || !body || !userId || !image) {
//     return res
//       .status(400)
//       .json({ message: "Title, body, and userId are required" });
//   }

//   try {
//     const user = await User.findById(userId);
//     if (!user || !user.deviceToken) {
//       return res
//         .status(404)
//         .json({ message: "User or device token not found" });
//     }

//     console.log("Sending notification to token:", user.deviceToken); // Log the device token for debugging

//     const message = {
//       token: user.deviceToken,
//       notification: {
//         title,
//         body,
//         image,
//       },
//     };
//     console.log("hello", message);
//     // Send notification
//     const response = await admin.messaging().send(message);
//     return res
//       .status(200)
//       .json({ message: "Notification sent successfully", response });
//   } catch (error) {
//     if (error.code === "messaging/invalid-registration-token") {
//       console.error("Invalid token detected:", {
//         userId,
//         deviceToken: user?.deviceToken || "No token",
//       });

//       // Clear invalid token from database
//       await User.findByIdAndUpdate(userId, { deviceToken: null });

//       return res.status(400).json({
//         message: "Invalid FCM token. Please refresh your device token.",
//       });
//     }

//     console.error("Error sending notification:", error);
//     return res
//       .status(500)
//       .json({ message: "Error sending notification", error: error.message });
//   }
// };
