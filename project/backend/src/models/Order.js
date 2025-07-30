import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Cart from './Cart.js';
import User from "./User.js";

const Order = sequelize.define('order',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cart,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    payment: {
        type: DataTypes.BOOLEAN,
        allowedNull: false,
        defaultValue: false
    },
    bank: {
        type: DataTypes.STRING,
        allowedNull: true
    },
    bank_card: {
        type: DataTypes.STRING,
        allowedNull: true
    }
});

export default Order;

