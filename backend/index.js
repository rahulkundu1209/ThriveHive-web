import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import worksheetRoutes from "./routes/worksheetRoutes.js";
import worksheetresponseRoute from "./routes/worksheetresponseRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/worksheet", worksheetRoutes);
app.use("/api/worksheetresponse", worksheetresponseRoute);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));