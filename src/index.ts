import { Photon } from "@prisma/photon";
import express, { json } from "express";

async function main() {
  let photon = new Photon();

  let app = express();

  app.use(json());
  app.get("/", (req, res) => res.send("TEST"));

  app.get("/posts", async (_, res) => {
    let posts = await photon.posts.findMany();
    console.log(posts);

    res.json(posts);
  });

  app.post("/posts", async (req, res) => {
    let post = {
      content: req.body.content,
      image: req.body.image ? req.body.image : undefined
    };

    let newPost = await photon.posts.create({ data: post });

    res.json(newPost);
  });

  app.listen(4000, () => console.log("Started listening on 4000"));
}

main();
