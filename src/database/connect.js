import { Sequelize } from "sequelize";
import {
  dbName,
  dbPassword,
  dbUsername,
  dbPort
} from "../config/index.js";

const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: "stamina-db-cluster-do-user-12023832-0.b.db.ondigitalocean.com",
  dialect: "mysql",
  port: dbPort
});


export default db;