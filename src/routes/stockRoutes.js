import { Router } from "express";
import {
    syncStockData,
    notFound,
} from "../controllers/stockController.js";
import methodNotAllowed from "../middlewares/methodNotAllowed.js";

const router = Router();

router
    .route("/sync")
    .post(syncStockData)
    .all(methodNotAllowed);


router.use("*", notFound);

export default router;
