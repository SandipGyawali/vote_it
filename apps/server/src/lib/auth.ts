import jwt from "jsonwebtoken";
import { env } from "@/lib/env";

export function generateJwtToken({
  pollId,
  name,
  email,
}: {
  pollId: string;
  name: string;
  email: string;
}): string {
  const token = jwt.sign({ pollId, name, email }, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
}

export function verifyJwtToken(token: string): {
  email: string;
  pollId: string;
  name: string;
} {
  return jwt.verify(token, env.JWT_SECRET) as {
    email: string;
    pollId: string;
    name: string;
  };
}
