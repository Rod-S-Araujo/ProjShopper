import { Options } from "sequelize";

const config: Options = {
  dialect: "sqlite",
  storage: "./database.sqlite",
};

export = config;
