const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db"); 

// Routes Import
const tasksRouter = require("./routes/tasks");
const contactRouter = require("./routes/contact");
const authRouter = require("./routes/auth");
const teamRoutes = require("./routes/team");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  })
);

// Routes Mounting with prefix
app.use("/api/tasks", tasksRouter);
app.use("/api/contact", contactRouter);
app.use("/api/auth", authRouter);
app.use("/api/team", teamRoutes);

// Static folder mapping for uploaded files (handles both paths safely)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/src/uploads', express.static(path.join(__dirname, 'src/uploads')));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});