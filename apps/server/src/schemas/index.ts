import { z } from "zod";

export const createPollSchema = z.object({
  name: z.string().min(1, { message: "name is required to create a poll" }),
  votesPerVoter: z
    .number()
    .min(1, { message: "individual vote number must be mentioned" }),
  topic: z.string().min(1, { message: "Poll topic cannot be empty" }),
  email: z.string().email().min(1, { message: "email cannot be empty" }),
});

export const joinPollSchema = z.object({
  name: z.string().min(1, { message: "name is required to join a poll" }),
  email: z.string().min(1, { message: "email is required to join a poll" }),
  pollId: z.string().min(1, { message: "poll id is required" }),
});

export const rejoinPollSchema = z.object({
  userId: z.string().min(1, { message: "name id required to rejoin" }),
  name: z.string().min(1, { message: "email is required to rejoin poll" }),
  email: z.string().min(1, { message: "email is required to rejoin" }),
  pollId: z.string().min(1, { message: "poll id must be mentioned" }),
});
