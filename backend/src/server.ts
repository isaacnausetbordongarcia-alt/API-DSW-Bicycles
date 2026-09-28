import { app } from "./app";
import { sequelize } from "./config/database";
import { env } from "./config/env";
import { defineAssociations } from "./models/associations";

// Import from the two models so we can use them here.
import "./modules/bicycles/bicycle.model";
import "./modules/brands/brand.model";

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