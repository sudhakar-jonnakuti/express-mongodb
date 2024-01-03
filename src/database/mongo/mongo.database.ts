import { InternalServeError } from "@shared/error/server.error";
import { MongoClient } from "mongodb";

import { AppMongoClient } from "./mongo.client";

class AppDatabase {
  listDatabases = async (client: MongoClient) => {
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
  };

  openConnection = async () => {
    const client: MongoClient = await AppMongoClient();
    try {
      await client.connect();
      console.log("Connect to the MongoDB cluster");
      await this.listDatabases(client);
    } catch (error: unknown) {
      console.log("Error connect to the MongoDB cluster");
      throw new InternalServeError(error);
    } finally {
      await client.close();
      console.log("Close connect to the MongoDB cluster");
    }
  };

  closeConnection = async () => {
    const client: MongoClient = await AppMongoClient();
    try {
      await client.close();
      console.log("Close connect to the MongoDB cluster");
    } catch (error: unknown) {
      throw new InternalServeError(error);
    }
  };
}

export { AppDatabase };
