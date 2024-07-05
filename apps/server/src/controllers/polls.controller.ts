import {
  CreatePoll,
  CreatePollDto,
  JoinPoll,
  JoinPollDto,
  RejoinPoll,
  RejoinPollDto,
} from "@/interfaces/index";
import { v4 as uuid } from "uuid";

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
    const userId = randomUserId();
    const pollId = randomPollId();

    return {
      ...fields,
      userId,
      pollId,
    };
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
