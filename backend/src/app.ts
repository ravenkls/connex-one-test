import express, { ErrorRequestHandler } from "express";
import promMid from "express-prometheus-middleware";
import createHttpError from "http-errors";
import logger from "morgan";

import authMiddleware from "./middleware/auth";
import indexRouter from "./routes/index";

const app = express();
const port = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  })
);
app.use(authMiddleware);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createHttpError(404));
});

// format errors as JSON
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err });
} as ErrorRequestHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
