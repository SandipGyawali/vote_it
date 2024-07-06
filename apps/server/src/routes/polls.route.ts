import { PollsController } from "@/controllers/polls.controller";
import express, { NextFunction, Request, Response, Router } from "express";
import {
  createPollSchema,
  getPollSchema,
  joinPollSchema,
  rejoinPollSchema,
} from "@/schemas";
import { CreatePollDto, JoinPollDto, RejoinPollDto } from "@/interfaces";

const router: Router = express.Router(); //express route handler
const pollsController = new PollsController(); //polls controller instance

router.get(
  "/get_poll",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fields = getPollSchema.parse(req.body);

      const controllerResponse = await pollsController.getPoll(fields);

      res.status(200).json(controllerResponse);
    } catch (err: any) {
      next(err);
    }
  }
);

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
      console.log(
        `Rejoining poll with ID: ${fields.pollId} for user with ID: ${fields.userId} with name: ${fields.name}`
      );
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
