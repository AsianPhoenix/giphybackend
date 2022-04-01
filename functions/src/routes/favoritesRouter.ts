import express from "express";
import { getClient } from "../db";
import Gif from "../models/Gif";

const favoritesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

favoritesRouter.get("/", async (req, res) => {
  try {
    const { uid } = req.query;
    const client = await getClient();
    const query: any = {
      ...(uid ? { uid: uid as string } : {}),
    };
    const results = await client
      .db()
      .collection<Gif>("favorites")
      .find(query)
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

favoritesRouter.post("/", async (req, res) => {
  try {
    const newFavorite: Gif = req.body;
    const client = await getClient();
    await client.db().collection<Gif>("favorites").insertOne(newFavorite);
    res.status(201);
    res.json(newFavorite);
  } catch (err) {
    errorResponse(err, res);
  }
});

favoritesRouter.delete("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Gif>("favorites")
      .deleteOne({ id });
    if (result.deletedCount) {
      res.sendStatus(204);
    } else {
      res.status(404).send(`ID ${id} not found`);
    }
  } catch (err) {
    errorResponse(err, res);
  }
});

export default favoritesRouter;
