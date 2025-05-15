// // Give the service worker access to Firebase Messaging.
// // Note that you can only use Firebase Messaging here. Other Firebase libraries
// // are not available in the service worker.
// // Replace 10.13.2 with latest version of the Firebase JS SDK.
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
// );
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
// );

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//   apiKey: "AIzaSyC1IzW5bhSNm_e23Idc3Rq-0PihR73SKUY",
//   authDomain: "pushnotifications-3c327.firebaseapp.com",
//   projectId: "pushnotifications-3c327",
//   storageBucket: "pushnotifications-3c327.firebasestorage.app",
//   messagingSenderId: "21020920919",
//   appId: "1:21020920919:web:b7041407a5f07d5734a712",
//   measurementId: "G-VW2YR5K7EQ",
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();
// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     data: payload.notification.data,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with the latest version of the Firebase JS SDK.
// Import Firebase libraries
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyC1IzW5bhSNm_e23Idc3Rq-0PihR73SKUY",
  authDomain: "pushnotifications-3c327.firebaseapp.com",
  projectId: "pushnotifications-3c327",
  storageBucket: "pushnotifications-3c327.firebasestorage.app",
  messagingSenderId: "21020920919",
  appId: "1:21020920919:web:b7041407a5f07d5734a712",
  measurementId: "G-VW2YR5K7EQ",
});

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message:",
    payload
  );

  // Extract data and notification fields
  const notificationTitle = payload.notification.title;
  const notificationBody = payload.notification.body;
  const notificationImage = payload.notification.image;
  const customData = payload.data; // Custom data passed in the payload

  // Customize the notification options
  const notificationOptions = {
    body: `${notificationBody}\nApproval Date: ${customData.approvalDate}`, // Include custom data in body
    icon: notificationImage,
    data: customData, // Attach custom data for further actions if needed
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
