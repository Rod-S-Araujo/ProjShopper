import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import CustomerModel from "./CustomerModel";
import DriverModel from "./DriverModel";

class RidesModel extends Model<
  InferAttributes<RidesModel>,
  InferCreationAttributes<RidesModel>
> {
  declare id?: number;
  declare origin: string;
  declare destination: string;
  declare distance: number;
  declare duration: string;
  declare value: number;
  declare date?: Date;
  declare status?: string;
  declare customer_id: string;
  declare driver_id: number;

  static associate(models: { DriverModel: typeof DriverModel }) {
    this.belongsTo(models.DriverModel, {
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
      type: sequelize.FLOAT,
    },
    date: {
      allowNull: true,
      type: sequelize.DATE,
    },
    status: {
      allowNull: true,
      type: sequelize.STRING,
    },
    customer_id: {
      allowNull: false,
      type: sequelize.STRING,
    },
    driver_id: {
      allowNull: false,
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
