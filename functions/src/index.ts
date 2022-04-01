import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import favoritesRouter from "./routes/favoritesRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/favorites", favoritesRouter);
export const api = functions.https.onRequest(app);
