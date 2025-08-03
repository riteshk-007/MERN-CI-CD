const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

// Enhanced CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get("/api/get", (req, res) => {
  console.log("GET /api/get endpoint called");
  res.status(200).json({ message: "Get request successful" });
});

app.get("/api/health", (req, res) => {
  console.log("GET /api/health endpoint called");
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
    port: PORT,
  });
});

// Add a root endpoint for testing
app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
    endpoints: ["/api/health", "/api/get"],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(
    `📡 Health check available at: http://localhost:${PORT}/api/health`
  );
  console.log(`🌐 API base URL: http://localhost:${PORT}/api`);
});
