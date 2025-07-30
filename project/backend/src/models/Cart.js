import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";
import Product from "./Product.js";

const Cart = sequelize.define('cart',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: Product,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

export default Cart;

