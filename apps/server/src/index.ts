import express, { Express } from "express";
import pollsRoute from "@/routes/polls.route";
import { morganMiddleware } from "@/middlewares/morgan";
import { ErrorHandler } from "@/middlewares/ErrorHandler";
import { redisClient } from "@/db/redisClient";
import { env } from "@/lib/env";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.get("/", (req, res, next) => {
  redisClient.get("index_key", (err, reply) => {
    if (err) {
      next(err);
    } else if (reply) {
      console.log(reply);
      res.send(`Cached value for key index_key is: ` + reply);
    } else {
      redisClient.set("index_key", "This is the data that i stored");
      res.send("No cached value found for key index_key so inserted new data.");
    }
  });
});

app.use("/poll", pollsRoute);

/**
 * @Note global error handler
 */
app.use(ErrorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
