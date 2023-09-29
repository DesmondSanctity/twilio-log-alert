import { Op } from "sequelize";
import db from "../database/connect.js";
import Orders from "./order.model.js";
import Users from "./user.model.js"


/************************* Associations For Models  ****************************/

// User and Order Association
Users.hasMany(Orders, {
  foreignKey: "userId",
  onDelete: 'cascade'
});
Orders.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: 'cascade'
});

// Payments and User Association
Users.hasMany(Payments, {
  foreignKey: "userId",
  onDelete: 'cascade'
});
Payments.belongsTo(Users, {
  foreignKey: "userId",
  onDelete: 'cascade'
});


/************************* Prototypes For Models  ****************************/

// Users and Orders
Users.prototype.addOrders = async function (orderIds, userId) {

  const orders = await Orders.findAll({
    where: {
      orderId: {
        [Op.in]: orderIds
      }
    }
  });

  for (let order of orders) {
    await order.update({ userId: userId });
  }

  return orders;

};


try {
  await db.authenticate();
  await db.sync({ alter: true })
    .then(() => {
      console.log('Database synced');
      console.log("Database connection has been established successfully.");
    })
    .catch(err => {
      console.log({ message: 'Error syncing database', error: err });
    });
} catch (error) {
  console.log("Unable to connect to the database due to: ", error);
}


export { Orders, Users, Payments }
