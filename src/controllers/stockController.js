// model
import { saveStock, getAllSymbols, getBySymbol } from "../models/stockModel.js";

// package
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

const fetchHistoricalData = async (symbol, fromDate, toDate) => {
    try {
        const result = await yahooFinance.chart(symbol, {
            period1: fromDate,
            period2: toDate,
            interval: "1d",
        });

        return result.quotes.map((quote) => ({
            date: quote.date,
            close: quote.close,
        }));
    } catch (error) {
        console.error(`Error fetching chart data for ${symbol}:`, error);
        return [];
    }
};

export const syncStockData = async (req, res) => {
    const symbols = [
        "AAPL",
        "GOOGL",
        "MSFT",
        "AMZN",
        "KO",
        "META",
        "NVDA",
        "ROKU",
        "JNJ",
    ];
    try {
        const toDate = new Date().toISOString().split("T")[0];
        const fromDate = new Date();
        fromDate.setFullYear(fromDate.getFullYear() - 1);
        const formattedFromDate = fromDate.toISOString().split("T")[0];

        for (const symbol of symbols) {
            const historicalData = await fetchHistoricalData(
                symbol,
                formattedFromDate,
                toDate
            );

            if (!historicalData.length) {
                continue;
            }

            for (const record of historicalData) {
                await saveStock(symbol, record.date, record.close);
            }
        }

        return res.json({
            message: "Stock data synchronized successfully",
            symbols,
        });
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

        const historicalData = await fetchHistoricalData(
            symbol,
            formattedFromDate,
            toDate
        );

        if (!historicalData.length) {
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
