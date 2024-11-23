import { Application } from "express";

const express = require("express");
const customers = require("./customerRoute");

const app = (app: Application): void => {
  app.use(express.json(), customers);
};

module.exports = app;
