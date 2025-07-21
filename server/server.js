const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'http://localhost:5173/', // For local dev
    'https://portfolio11-taupe.vercel.app/' // Your live frontend
  ],
  methods: ['GET', 'POST', 'OPTIONS'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
