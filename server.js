import express from "express";
import cors from "cors";
import router from "./src/routes/stockRoutes.js";

import { PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use("/api", router);
app.use(cors());

app.listen(PORT, () => {
    console.log(`🔥 Server on 🔥 http://localhost:${PORT}`);
});
