import { Photon } from "@prisma/photon";
import express, { json } from "express";

async function main() {
  let photon = new Photon();

  let app = express();

  app.use(json());

  app.get("/posts", async (_, res) => {
    let posts = await photon.posts.findMany();
    console.log(posts);

    res.json(posts);
  });

  app.post("/thread", async (req, res) => {
    let thread = await photon.threads.create({ data: req.body });

    res.json(thread);
  });

  app.get("/thread/:id", async (req, res) => {
    let thread = await photon.threads.findOne({
      where: { id: req.params.id },
      include: { posts: true }
    });

    res.json(thread);
  });

  app.post("/thread/:id", async (req, res) => {
    let post = await photon.posts.create({
      data: {
        ...req.body,
        thread: { connect: { id: req.params.id } }
      }
    });

    res.json(post);
  });

  app.listen(4000, () => console.log("Started listening on 4000"));
}

main();
