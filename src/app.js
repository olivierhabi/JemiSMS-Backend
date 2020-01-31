import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes";
import authRoute from "./routes/Auth";

dotenv.config();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

//Project_11 (API)
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);

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
