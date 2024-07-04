import { PollsController } from "@/controllers/polls.controller";
import { Request, Response, Router } from "express";
import express from "express";

const router: Router = express.Router(); //express route handler
const pollsController = new PollsController(); //polls controller instance

router.get("/get-polls", async (req: Request, res: Response) => {
  try {
    await pollsController.createPoll();
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
