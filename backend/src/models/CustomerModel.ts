import { Model } from "sequelize";
import db from ".";
import sequelize from "sequelize";

class CustomerModel extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
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
  { sequelize: db, tableName: "customers", timestamps: false }
);

export default CustomerModel;
