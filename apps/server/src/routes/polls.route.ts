import { PollsController } from "@/controllers/polls.controller";
import { NextFunction, Request, Response, Router } from "express";
import express from "express";
import { createPollSchema, joinPollSchema, rejoinPollSchema } from "@/schemas";
import { CreatePollDto, JoinPollDto, RejoinPollDto } from "@/interfaces";

const router: Router = express.Router(); //express route handler
const pollsController = new PollsController(); //polls controller instance

router.get(
  "/create",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fields = createPollSchema.parse(req.body);
      const controllerResponse: CreatePollDto =
        await pollsController.createPoll(fields);
      res.status(200).json(controllerResponse);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/join",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fields = joinPollSchema.parse(req.body);

      const controllerResponse: JoinPollDto = await pollsController.joinPoll(
        fields
      );

      console.log(controllerResponse);

      res.status(200).json(controllerResponse);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/rejoin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fields = rejoinPollSchema.parse(req.body);
      const controllerResponse: RejoinPollDto =
        await pollsController.rejoinPoll(fields);

      console.log(controllerResponse);

      res.status(200).json(controllerResponse);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
