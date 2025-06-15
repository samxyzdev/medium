import express from "express";
import { prisma } from "@repo/db/prisma";
import { authMiddleware } from "./middleware.js";
import { UserSchema, BlogSchema } from "@repo/db/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

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
    },
  });
  console.log("in the signup route");
  console.log(process.env.JWT_SECRET);
  console.log(createUser.id);

  const token = jwt.sign(
    { userId: createUser.id, username: createUser.username },
    process.env.JWT_SECRET!
  );
  res.json({
    msg: "User created succesfully",
    token: token,
  });
  return;
});

const signinUserSchema = UserSchema.omit({ id: true });
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
  console.log(isUserExist?.username);

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
  const token = jwt.sign(
    { userId: isUserExist.id, username: isUserExist.username },
    process.env.JWT_SECRET!
  );
  res.json({
    msg: "User created succesfully",
    token: token,
  });
  return;
});

const createBlogSchema = BlogSchema.omit({ id: true, autherId: true });
app.post("/create/blog", authMiddleware, async (req, res) => {
  console.log("HEllo from create blog");
  console.log(req.id);

  const blogData = createBlogSchema.safeParse(req.body);
  if (!blogData.success) {
    res.json({
      msg: "Please send correct data",
    });
    return;
  }
  const createBlog = await prisma.blog.create({
    data: {
      title: blogData.data.title,
      content: blogData.data.content,
      autherId: req.id,
    },
  });
  if (!createBlog) {
    res.json({
      msg: "error while creating a blog",
    });
    return;
  }
  res.json({
    msg: "Blog created Successfully",
  });
  return;
});

app.put("/user/edit/:blog", authMiddleware, async (req, res) => {
  const findBlog = await prisma.blog.findFirst({
    where: {
      id: req.id,
    },
  });
  if (!findBlog) {
    res.json({
      msg: "You are not owner of this blog",
    });
    return;
  }
  const updateBlog = await prisma.blog.update({
    where: {
      id: req.id,
    },
    data: {
      title: req.body.title,
      content: req.body.content,
    },
  });
  if (!updateBlog) {
    res.json({
      msg: "Error while creating a blog",
    });
    return;
  }
  res.json({
    msg: "Blog updated successfully",
  });
  return;
});

app.get("/blogs/latest", async (req, res) => {
  const take = parseInt(req.query.take as string) || 10;
  const skip = parseInt(req.query.skip as string) || 0;
  console.table([take, skip]);

  const blogs = await prisma.blog.findMany({
    skip,
    take,
    include: {
      User: {
        select: {
          username: true,
        },
      },
    },
  });
  const blogPreview = blogs.map((blog) => ({
    ...blog,
    content: blog.content.slice(0, 150),
  }));
  res.json({
    blogPreview,
  });
  return;
});

app.get(":blogId", async (req, res) => {
  const blogId = req.params.blogId;
  const blog = await prisma.blog.findFirst({
    where: {
      id: blogId,
    },
  });
  if (!blog) {
    res.json({
      msg: "Blog not found",
    });
    return;
  }
  res.json({
    blog,
  });
  return;
});

app.get("/search", async (req, res) => {
  const query = req.query.q;
  const results = await prisma.blog.findMany({
    where: {
      title: {
        contains: query as string,
      },
    },
    take: 2,
  });
  const matchingTitles = results.map((result) => result.title);
  res.json({
    matchingTitles,
  });
  return;
});
app.listen(3000);
