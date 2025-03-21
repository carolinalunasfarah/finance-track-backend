import { saveStock, getAllSymbols, getBySymbol } from "../models/stockModel.js";
import yahooFinance from "yahoo-finance2";

export const getStockData = async (req, res) => {
    const { symbol } = req.params;

    try {
        const data = await getBySymbol(symbol);
        if (data.length === 0) {
            return res
                .status(404)
                .json({ message: "No data found for this symbol" });
        }
        return res.json(data);
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return res.status(500).json({ error: "Error fetching stock data" });
    }
};

export const getAllStocks = async (req, res) => {
    try {
        const data = await getAllSymbols();
        return res.json(data);
    } catch (error) {
        console.error("Error fetching stock symbols:", error);
        return res.status(500).json({ error: "Error fetching stock symbols" });
    }
};

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

export const syncStockDataBySymbol = async (req, res) => {
    const { symbol } = req.params;

    try {
        const toDate = new Date().toISOString().split("T")[0];
        const fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        const formattedFromDate = fromDate.toISOString().split("T")[0];

        const historicalData = await yahooFinance.historical(symbol, {
            period1: formattedFromDate,
            period2: toDate,
            interval: "1d",
        });

        if (!historicalData || historicalData.length === 0) {
            return res
                .status(404)
                .json({ message: "No data found from Yahoo Finance" });
        }

        for (const record of historicalData) {
            await saveStock(symbol, record.date, record.close);
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
