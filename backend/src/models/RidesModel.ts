import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import CustomerModel from "./CustomerModel";
import DriverModel from "./DriverModel";

class RidesModel extends Model {
  declare id: number;
  declare origin: string;
  declare destination: string;
  declare distance: number;
  declare duration: string;
  declare value: number;
  declare date: Date;
  declare status: number;
  declare min_distance: number;
  declare customer_id: number;
  declare driver_id: number;

  static associate() {
    RidesModel.belongsTo(CustomerModel, {
      foreignKey: "customer_id",
      as: "customer",
    });
    RidesModel.belongsTo(DriverModel, {
      foreignKey: "driver_id",
      as: "driver",
    });
  }
}

RidesModel.init(
  {
    id: {
      primaryKey: true,
      type: sequelize.INTEGER,
    },
    origin: {
      allowNull: false,
      type: sequelize.STRING,
    },
    destination: {
      allowNull: false,
      type: sequelize.STRING,
    },
    distance: {
      allowNull: false,
      type: sequelize.NUMBER,
    },
    duration: {
      allowNull: false,
      type: sequelize.STRING,
    },
    value: {
      allowNull: false,
      type: sequelize.NUMBER,
    },
    date: {
      allowNull: false,
      type: sequelize.DATE,
    },
    status: {
      allowNull: true,
      type: sequelize.STRING,
    },
    customer_id: {
      allowNull: true,
      type: sequelize.NUMBER,
    },
    driver_id: {
      allowNull: true,
      type: sequelize.NUMBER,
    },
  },
  {
    sequelize: db,
    modelName: "Rides",
    tableName: "rides",
    timestamps: false,
  }
);

export default RidesModel;
