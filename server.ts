import app from "./src/app";
import config from "./src/app/config";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect("config.database_url as string");

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
