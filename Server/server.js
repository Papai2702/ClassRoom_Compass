const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const snapshotRoute = require("./routes/snapshot");
const audioRoute = require("./routes/audio");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // increase limit for audio/images

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/classroom", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Root route
app.get("/", (req, res) => {
  res.send("Classroom backend is running!");
});

// Use routes
app.use("/api/snapshot", snapshotRoute);
app.use("/api/audio", audioRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
