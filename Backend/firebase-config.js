// // import admin from "firebase-admin";
// // import fs from "fs";
// // import path from "path";

// // // Read and parse the JSON file manually
// // const serviceAccount = JSON.parse(
// //   fs.readFileSync(path.resolve("./server/serviceAccount.json"), "utf8")
// // );

// // // Initialize Firebase Admin SDK
// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount),
// // });

// // export default admin;

// import admin from "firebase-admin";
// import fs from "fs";
// import path from "path";

// // Read and parse the JSON file manually
// const serviceAccountPath = path.resolve("./server/serviceAccount.json");
// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export default admin;
