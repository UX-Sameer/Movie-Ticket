import express from "express";
import { createCity, getCities } from "../controllers/city.controller.js";

const router = express.Router();

router.post("/", createCity);     // POST /api/cities
router.get("/", getCities);       // GET  /api/cities

export default router;
