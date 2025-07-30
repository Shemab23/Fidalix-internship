import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Product from "./Product.js";
import User from "./User.js";

const Store = sequelize.define('store',{
    shop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primayKey: true,
        references: {
            model: Product,
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

export default Store;

