import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL!, {
  dialect: "mysql", // or the dialect your database uses
});

sequelize
  .authenticate()
  .then(() =>
    console.log("Database connection has been established successfully.")
  )
  .catch((err: Error) =>
    console.error("Unable to connect to the database:", err)
  );

export default sequelize;
