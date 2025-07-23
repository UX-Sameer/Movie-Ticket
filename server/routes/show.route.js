import express from "express";
import { createShow, getShows } from "../controllers/show.controller.js";

const router = express.Router();

router.post("/", createShow);     // POST /api/shows
router.get("/", getShows);        // GET  /api/shows

export default router;
