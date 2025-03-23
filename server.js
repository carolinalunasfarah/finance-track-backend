import express from "express";
import cors from "cors";
import router from "./src/routes/stockRoutes.js";

import { PORT } from "./config.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api", router);


app.listen(PORT, () => {
    console.log(`🔥 Server on 🔥 http://localhost:${PORT}`);
});
