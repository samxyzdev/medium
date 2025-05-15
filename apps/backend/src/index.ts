import express from "express";
import { prisma } from "@repo/db/prisma";
import { authMiddleware } from "./middleware.js";
import { UserSchema, BlogSchema } from "@repo/db/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
const signupUserSchema = UserSchema.omit({ id: true });
app.post("/signup", async (req, res) => {
  console.log(req.body);
  const userData = signupUserSchema.safeParse(req.body);
  // console.log(userData.error);
  if (!userData.success) {
    res.json({
      msg: "Please send correct data",
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(userData.data.password, 10);
  const createUser = await prisma.user.create({
    data: {
      username: userData.data.username,
      password: hashedPassword,
      role: userData.data.role,
    },
  });
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign({ userId: createUser.id }, process.env.JWT_SECRET!);
  res.json({
    msg: "User created succesfully",
    token: token,
  });
  return;
});

const signinUserSchema = UserSchema.omit({ id: true, role: true });
app.post("/signin", async (req, res) => {
  const userData = signinUserSchema.safeParse(req.body);
  if (!userData.success) {
    res.json({
      msg: "Please send correct data",
    });
    return;
  }

  const isUserExist = await prisma.user.findFirst({
    where: {
      username: userData.data.username,
    },
  });
  if (!isUserExist) {
    res.json({
      msg: "User doesn't exist",
    });
    return;
  }
  const comparePassword = await bcrypt.compare(
    userData.data.password,
    isUserExist.password
  );
  if (!comparePassword) {
    res.json({
      msg: "Please enter correct password",
    });
    return;
  }
  console.log(process.env.JWT_SECRET);
  const token = jwt.sign({ userId: isUserExist.id }, process.env.JWT_SECRET!);
  res.json({
    msg: "User created succesfully",
    token: token,
  });
  return;
});
app.post("/admin/blog", authMiddleware, (req, res) => {});
app.get("/user/:blog", (req, res) => {});
app.get("/top10blog", (req, res) => {});

app.listen(3001);
