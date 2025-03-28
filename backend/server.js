const express = require("express");
const cors = require("cors");
import dotenv from 'dotenv';

dotenv.config();

const snykRoutes = require("./routes/snykRoutes");
const sonarRoutes = require("./routes/sonarRoutes");
const trivyRoutes = require("./routes/trivyRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/snyk", snykRoutes);
app.use("/sonarqube", sonarRoutes);
app.use("/trivy", trivyRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
