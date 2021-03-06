import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/UserRoutes";
import authRoute from "./routes/AuthRoutes";
import accountRoute from "./routes/AccountRoute";
import contactRoute from "./routes/ContactRoutes";
import messageRoute from "./routes/MessageRoutes";
import paymentReqRoute from "./routes/PaymentReqRoute";
import balanceRoutes from "./routes/BalanceRoutes";
import historyRoutes from "./routes/HistoryRoutes";
import scheduleRoutes from "./routes/ScheduleRoutes";
import createAdmin from "./controllers/CreateAdministrator";
import cors from "cors";

import models from "./models";

dotenv.config();
createAdmin();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//Project_11 (API)
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/account", accountRoute);
app.use("/api/contact", contactRoute);
app.use("/api/message", messageRoute);
app.use("/api/pay", paymentReqRoute);
app.use("/api/balance", balanceRoutes);
app.use("/api/history", historyRoutes);
// app.use("/api/schedule", scheduleRoutes);

app.get("/", (req, res) => {
  console.log({ message: "Welcome PROJECT_11-API" });
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
