import { Application } from "express";

const express = require("express");
const customers = require("./customerRoute");
const drivers = require("./driverRoute");

const app = (app: Application): void => {
  app.use(express.json(), customers, drivers);
};

module.exports = app;
