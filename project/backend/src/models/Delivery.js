import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Order from './Order.js';
import User from "./User.js";

const Deliveries = sequelize.define('delivery',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.ENUM('ordered','pending','received'),
        allowNull: false
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    delivery_man_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    price: {
        type: DataTypes.DOUBLE,
        allowedNull: false
    }
});

export default Deliveries;

