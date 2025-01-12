import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDb";
import powerMeter from "./routes/powersMeter";
import manual from "./routes/input";

const app = express();
const port = process.env.PORT || 3000;

// const hostname = "192.168.1.62"; // Specify the host you want

const hostname = "0.0.0.0"; // Specify the host you want

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"], // Mengizinkan header yang spesifik
  })
);
app.use(express.json());

app.use("/api/v1/monitoring/powersmeter", powerMeter);
app.use("/api/v1/monitoring/manual/add/", manual);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(Number(port), hostname, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

startServer();
