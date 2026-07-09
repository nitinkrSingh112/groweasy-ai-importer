import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import importRoutes from "./routes/importRoutes";


const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://10.240.23.61:3000"
    ],
    methods: [
      "GET",
      "POST"
    ],
    allowedHeaders: [
      "Content-Type"
    ]
  })
);


app.use(
  express.json()
);


app.use(
  "/api/import",
  importRoutes
);


app.get(
  "/",
  (req, res) => {
    res.send("Backend is running");
  }
);


export default app;