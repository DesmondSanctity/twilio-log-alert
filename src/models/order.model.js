import { Sequelize } from "sequelize";
import db from "../database/connect.js";


const { DataTypes } = Sequelize;

const Orders = db.define('orders', {
    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    itemName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itemDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: 'Pending',
        values: ['Completed', 'Pending', 'Failed']

    },

}, {
    freezeTableName: true,
});



export default Orders;