import express from "express";
import { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).send({ mensagem: "boas-vindas à API" });
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("teste rodando");
});
