import { saveStock } from "../models/stockModel.js";
import yahooFinance from "yahoo-finance2";

export const syncStockData = async (req, res) => {
    const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "ROKU"];
    try {
        const toDate = new Date().toISOString().split("T")[0];
        const fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        const formattedFromDate = fromDate.toISOString().split("T")[0];

        for (const symbol of symbols) {
            const historicalData = await yahooFinance.historical(symbol, {
                period1: formattedFromDate,
                period2: toDate,
                interval: "1d",
            });

            if (!historicalData || historicalData.length === 0) {
                continue;
            }

            for (const record of historicalData) {
                await saveStock(symbol, record.date, record.close);
            }
        }

        return res.json({ message: "Stock data synchronized successfully" });
    } catch (error) {
        console.error("Error syncing stock data:", error);
        return res.status(500).json({ error: "Error syncing stock data" });
    }
};

export const notFound = (req, res) => {
    res.status(404).json({ message: "Page not found" });
};
