import express from "express";
import { createMovie, getMovies } from "../controllers/movie.controller.js";

const router = express.Router();

router.post("/", createMovie);     // POST /api/movies
router.get("/", getMovies);        // GET  /api/movies

export default router;
