import express from "express";
import { prisma } from "@repo/db/prisma";
const app = express();

app.get("/signup", (req, res) => {});
app.get("/signin", (req, res) => {});
app.post("/admin/blog", (req, res) => {});
app.get("/user/:blog", (req, res) => {});
app.get("/top10blog", (req, res) => {});
