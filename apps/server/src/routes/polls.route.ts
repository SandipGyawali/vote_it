import { PollsController } from "@/controllers/polls.controller";
import { Request, Response, Router } from "express";
import express from "express";

const router: Router = express.Router(); //express route handler
const pollsController = new PollsController(); //polls controller instance

router.get("/", (req: Request, res: Response) => {
  console.log(req.body);

  res.json({ message: "This is polls route" });
});

router.get("/get_polls", async (req: Request, res: Response) => {
  try {
    await pollsController.createPoll();
  } catch (err) {
    res.status(500).send(err);
  }

  res.json({ message: "This is get-polls get route" });
});

export default router;
