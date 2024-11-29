import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.get("/", async (req: Request, res: Response) => {
  try {
    await prisma.user.create({
      data: {
        name: "Rich",
        email: "hello@prisma.com",
        posts: {
          create: {
            title: "My first post",
            body: "Lots of really interesting stuff",
            slug: "my-first-post",
          },
        },
      },
    });

    const allUsers = await prisma.user.findMany({
      include: {
        posts: true,
      },
    });
    res.json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

export { app };
