import { redisClient } from "@/db/redisClient";
import {
  CreatePoll,
  CreatePollDto,
  JoinPoll,
  JoinPollDto,
  RejoinPoll,
  RejoinPollDto,
} from "@/interfaces/index";
import { v4 as uuid } from "uuid";
import { env } from "@/lib/env";

function randomPollId() {
  return uuid().substring(0, 6);
}

function randomUserId() {
  return uuid().substring(0, 12);
}

export class PollsController {
  /**
   * @Note create a poll section.
   */
  async createPoll(fields: CreatePoll): Promise<CreatePollDto> {
    try {
      const userId = randomUserId();
      const pollId = randomPollId();

      const key = `polls:${pollId}`;
      const duration: any = env.POLL_DURATION;

      // redis transaction
      const transaction = await redisClient.multi();
      transaction.call("JSON.SET", key, ".", JSON.stringify(fields));
      transaction.expire(key, duration);

      const result = transaction.exec();
      // [
      //   ["sendCommand", "JSON.SET", key, ".", JSON.stringify(fields)],
      //   ["expire", key, duration],
      // ]
      // .exec();
      if (result == null)
        throw new Error("Transaction aborted due to an error.");

      console.log(await redisClient.keys("*"));

      return {
        ...fields,
        userId,
        pollId,
      };
    } catch (err: any) {
      throw new Error(err);
    }
  }

  /**
   * @Note get poll section
   */
  async getPoll(fields: { pollId: string }): Promise<any> {
    const key = `polls:${fields.pollId}`;

    try {
      const currentPoll: any = await redisClient.call("JSON.GET", key, ".");

      if (!currentPoll)
        throw new Error(`Poll with id: ${key} does not exist in redis`);

      return JSON.parse(currentPoll);
    } catch (err: any) {
      throw new Error(err);
    }
  }

  /**
   * @Note jon/participate the poll.
   */
  async joinPoll(fields: JoinPoll): Promise<JoinPollDto> {
    const userId = randomUserId();

    return {
      ...fields,
      userId,
    };
  }

  /**
   * @Note rejoin/re-participate the poll.
   */
  async rejoinPoll(fields: RejoinPoll): Promise<RejoinPollDto> {
    return fields;
  }
}
