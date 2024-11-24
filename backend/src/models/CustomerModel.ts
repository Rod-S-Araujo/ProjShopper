import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";
import RidesModel from "./RidesModel";

class CustomerModel extends Model {
  declare id: number;
  declare name: string;
  declare email: string;

  static associate() {
    CustomerModel.hasMany(RidesModel, {
      foreignKey: "customer_id",
      as: "rides",
    });
  }
}

CustomerModel.init(
  {
    id: {
      type: sequelize.NUMBER,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
    },
    email: {
      type: sequelize.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "Customers",
    tableName: "customers",
    timestamps: false,
  }
);

export default CustomerModel;
