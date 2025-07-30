import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Product = sequelize.define('product',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profile_path: {
        type: DataTypes.STRING,
        allowedNull: false
    },
    measure: {
        type: DataTypes.STRING,
        allowedNull: false
    }
});

export default Product;

