import { verifyJwtToken } from "@/lib/auth";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const AuthParser = z.object({
  token: z.string().transform((parse) => ({
    token: parse.split(" ")[1],
  })),
});

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearer = req.headers.authorization;
  console.log(bearer);
  if (!bearer) {
    res.status(401);
    res.end();
    return;
  }

  const parsedAuthToken = AuthParser.safeParse({
    token: bearer,
  });

  if (!parsedAuthToken.success) {
    res.status(401);
    res.end();

    return;
  }

  try {
    const { token } = parsedAuthToken.data.token;
    const data = verifyJwtToken(token);

    req.authData = data;
    next();
  } catch (err: any) {
    res.status(401);
    res.end();
  }
}
