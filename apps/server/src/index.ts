import express from "express";
import pollsRoute from "@/routes/polls.route";

const app = express();

app.get("/", (req, res) => {
  console.log("This is amazing");
  res.json({ message: "This is home route" });
});

app.use("/polls", pollsRoute);

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
