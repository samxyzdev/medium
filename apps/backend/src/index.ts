import express from "express";
import { prisma } from "@repo/db/prisma";
import { authMiddleware } from "./middleware.js";
const app = express();

app.get("/signup", (req, res) => {});
app.get("/signin", (req, res) => {});
app.post("/admin/blog", authMiddleware, (req, res) => {});
app.get("/user/:blog", (req, res) => {});
app.get("/top10blog", (req, res) => {});
