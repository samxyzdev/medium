import express from "express";
import { prisma } from "@repo/db/prisma";
import { authMiddleware } from "./middleware.js";
import { UserSchema, BlogSchema } from "@repo/db/schema";

const app = express();

app.get("/signup", (req, res) => {
  const data = UserSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      msg: "Please send correct data",
    });
    return;
  }
});
app.get("/signin", (req, res) => {});
app.post("/admin/blog", authMiddleware, (req, res) => {});
app.get("/user/:blog", (req, res) => {});
app.get("/top10blog", (req, res) => {});
