import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mediaRoutes from "./routes/mediaRoutes";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/media", mediaRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost:${PORT}`);
});
