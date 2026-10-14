import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";
import { defineAssociations } from "./models/associations.js";

// Import from the two models so we can use them here.
import "./modules/bicycles/bicycle.model.js"
import "./modules/brands/brand.model.js"
import "./modules/bicycle-details/bicycle-detail.model.js"
import "./modules/customer/customer.model.js"
import "./modules/order/order.model.js"
import "./modules/order-item/order-item.model.js"
import "./modules/models/model.model.js"

async function startServer() {
  try {

    defineAssociations();

    await sequelize.authenticate();

    console.log("Connection to MySQL stablished.");

    await sequelize.sync({force: true}).then (() => {
      console.log(" Data synchronized");
    });

    console.log("Models synchronized.");

    app.listen(env.PORT, () => {
      console.log(
        `Server working on http://localhost:${env.PORT}`
      );
    });

  } catch (error) {

    console.error(
      "App could no be started:",
      error
    );

    process.exit(1);
  }
}

startServer();