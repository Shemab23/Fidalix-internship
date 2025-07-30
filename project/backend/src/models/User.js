import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const User = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    kind: {
        type: DataTypes.ENUM('customer','business','delivery'),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowedNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowedNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowedNull: false
    },
    profile_path: {
        type: DataTypes.STRING,
        allowedNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowedNull: false
    }
});

export default User;
