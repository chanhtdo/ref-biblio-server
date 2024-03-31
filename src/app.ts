import express, { Express } from "express";
import { port, timezone } from "appSettings.json";
import cors from "cors";
import morgan from "morgan";
import Router from "routes";
import { LogMessage } from "utils/logging";
import { LoggingType } from "ts/enums/logging";

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(Router);

process.env.TZ = timezone;
const envPort = process.env.PORT || port;

app.listen(envPort, () => {
  LogMessage(
    `[${timezone}] Ref-Biblio API server is ready at http://localhost:${envPort}`,
    "app.start",
    undefined,
    LoggingType.Event,
  );
});
