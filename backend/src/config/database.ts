import { Options } from "sequelize";

const config: Options = {
  dialect: "sqlite",
  storage: "./database.sqlite",
  logging: console.log,
  dialectOptions: {
    foreignKeys: true,
  },
};

export = config;
