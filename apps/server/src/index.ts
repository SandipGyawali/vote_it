import express from "express";
import pollsRoute from "@/routes/polls.route";
import { morganMiddleware } from "@/middlewares/morgan";
import { ErrorHandler } from "@/middlewares/ErrorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

app.get("/", (req, res) => {
  console.log("This is amazing");
  res.json({ message: "This is home route" });
});

app.use("/poll", pollsRoute);

/**
 * @Note global error handler
 */
app.use(ErrorHandler);

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
