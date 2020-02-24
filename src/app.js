import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes";
import authRoute from "./routes/AuthRoutes";
import accountRoute from "./routes/AccountRoute";
import contactRoute from "./routes/ContactRoutes";
import messageRoute from "./routes/MessageRoutes";
import cors from "cors";

import models from "./models";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "gambino-backend.herokuapp.com"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});

//Project_11 (API)
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/account", accountRoute);
app.use("/api/contact", contactRoute);
app.use("/api/message", messageRoute);

app.get("/", (req, res) => {
  return res.status(200).send({
    status: 200,
    message: "Welcome PROJECT_11-API"
  });
});

models.sequelize
  .sync({
    force: false
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening on port ${process.env.PORT}`)
    )
  );

export default app;
