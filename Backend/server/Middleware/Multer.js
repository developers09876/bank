// // Multer configuration
// import multer from 'multer';
// import path from 'path';

// // Configure storage for Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './Public/Product');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storage });

// export default upload;



import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("first", file);
    cb(null, "./Public/Product");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)

  },
});

let resume = multer({ storage: storage });
export default resume.single("profilePic");