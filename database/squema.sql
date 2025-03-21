CREATE DATABASE finance_track;

\c finance_track

CREATE TABLE stocks (id SERIAL PRIMARY KEY, symbol TEXT NOT NULL, date DATE NOT NULL, close_price NUMERIC NOT NULL);
