import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import snykRoutes from "./routes/snykRoutes.js";
import sonarRoutes from "./routes/sonarqubeRoutes.js";
import trivyRoutes from "./routes/trivyRoutes.js";


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET, POST",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use("/api/snyk", snykRoutes);
app.use("/api/sonarqube", sonarRoutes);
app.use("/api/trivy", trivyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
