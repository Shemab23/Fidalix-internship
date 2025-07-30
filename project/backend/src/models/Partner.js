import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Partner = sequelize.define('partner',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Partner;

