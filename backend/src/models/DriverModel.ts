import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import RidesModel from "./RidesModel";

class DriverModel extends Model {
  declare id: number;
  declare name: string;
  declare description: string;
  declare vehicle: string;
  declare rating: number;
  declare comment: string;
  declare rate_per_km: number;
  declare min_distance: number;

  static associate() {
    DriverModel.hasMany(RidesModel, { foreignKey: "customer_id", as: "rides" });
  }
}

DriverModel.init(
  {
    id: {
      primaryKey: true,
      type: sequelize.INTEGER,
    },
    name: {
      type: sequelize.STRING,
    },
    description: {
      type: sequelize.STRING,
    },
    vehicle: {
      type: sequelize.STRING,
    },
    rating: {
      type: sequelize.FLOAT,
    },
    comment: {
      type: sequelize.STRING,
    },
    rate_per_km: {
      type: sequelize.FLOAT,
    },
    min_distance: {
      type: sequelize.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "Drivers",
    tableName: "drivers",
    timestamps: false,
  }
);

export default DriverModel;
