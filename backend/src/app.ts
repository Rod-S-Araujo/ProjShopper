require("dotenv").config();
const cors = require("cors");

import express, { NextFunction } from "express";
import { Request, Response } from "express";
import errorHandler from "./middlewarte/errorHandler";
const routes = require("./routes");

const app = express();
app.use(cors());
routes(app);

const PORT = 8080;

app.use(errorHandler);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
module.exports = app;
