import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import worksheetRoutes from "./routes/worksheetRoutes.js";
import worksheetresponseRoute from "./routes/worksheetresponseRoute.js";
import worksheetResponse from "./routes/worksheetResponse.js";
import learnerRoutes from "./routes/learnerRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

// 1. Configure CORS properly
const corsOptions = {
  origin: ['http://localhost:5173', 'https://thrive-hives.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 204
};

// 2. Apply CORS middleware before routes
app.use(cors(corsOptions));

// 3. Handle preflight requests globally
app.options('*', cors(corsOptions));

// 4. Body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 5. Routes
app.use("/api/auth", authRoutes);
app.use("/api/worksheet", worksheetRoutes);
app.use("/api/worksheetresponse", worksheetresponseRoute);
app.use("/worksheet-response", worksheetResponse);
app.use('/learner', learnerRoutes);
app.use('/api/profile', profileRoutes);

// 6. Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));