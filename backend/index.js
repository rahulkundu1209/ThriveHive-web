import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import worksheetRoutes from "./routes/worksheetRoutes.js";
import worksheetresponseRoute from "./routes/worksheetresponseRoute.js";
import worksheetResponse from "./routes/worksheetResponse.js";
import learnerRoutes from "./routes/learnerRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"; 
const app = express();
app.use(express.json());


  app.use(cors());
  app.options('*', cors()); 
  
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/worksheet", worksheetRoutes);
app.use("/api/worksheetresponse", worksheetresponseRoute);
app.use("/worksheet-response", worksheetResponse);
app.use('/learner', learnerRoutes);
app.use('/api/profile', profileRoutes); 

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));