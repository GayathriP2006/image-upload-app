const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.post(
  "/upload",
  upload.single("image"),
  (req, res) => {
    res.json({
      imageUrl:
        `http://localhost:5000/uploads/${req.file.filename}`,
    });
  }
);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});