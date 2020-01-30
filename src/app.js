import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "Welcome PROJECT_11-API"
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);

export default app;
