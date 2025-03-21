import { pool } from "../../database/connectionDB.js";

export const saveStock = async (symbol, date, closePrice) => {
  try {

      const checkQuery = "SELECT * FROM stocks WHERE symbol = $1 AND date = $2";
      const result = await pool.query(checkQuery, [symbol, date]);

      if (result.rows.length > 0) {
          const updateQuery = `
            UPDATE stocks
            SET close_price = $1
            WHERE symbol = $2 AND date = $3
          `;
          await pool.query(updateQuery, [closePrice, symbol, date]);
      } else {
          const insertQuery = `
            INSERT INTO stocks (symbol, date, close_price)
            VALUES ($1, $2, $3)
          `;
          await pool.query(insertQuery, [symbol, date, closePrice]);
      }
  } catch (error) {
      throw new Error("Error saving stock data: " + error.message);
  }
};


export const getBySymbol = async (symbol) => {
    try {
        const query = "SELECT * FROM stocks WHERE symbol = $1";
        const result = await pool.query(query, [symbol]);
        return result.rows;
    } catch (error) {
        throw new Error("Error getting stock data by symbol: " + error.message);
       
    }
};

export const getAllSymbols = async () => {
    try {
        const query = "SELECT DISTINCT symbol FROM stocks";
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw new Error("Error getting all stock symbols: " + error.message);
    }
};
