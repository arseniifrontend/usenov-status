import express from "express";
import cors from "cors";
import statusRoutes from "./routes/status.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        name: "Usenov Status API",
        status: "running",
    });
});

app.use("/api", statusRoutes);

export default app;