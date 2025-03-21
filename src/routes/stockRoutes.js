import { Router } from "express";
import {
    getStockData,
    getAllStocks,
    syncStockData,
    syncStockDataBySymbol,
    notFound,
} from "../controllers/stockController.js";
import methodNotAllowed from "../middlewares/methodNotAllowed.js";

const router = Router();

router
    .route("/stocks")
    .get(getAllStocks)
    .all(methodNotAllowed);

router
    .route("/stocks/:symbol")
    .get(getStockData)
    .all(methodNotAllowed);

router
    .route("/sync")
    .post(syncStockData)
    .all(methodNotAllowed);

router
    .route("/sync/:symbol")
    .post(syncStockDataBySymbol)
    .all(methodNotAllowed);

router.use("*", notFound);

export default router;
