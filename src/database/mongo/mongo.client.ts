import { MongoClient } from "mongodb";

const AppMongoClient = async () => {
  const { MONGO_SERVICE, MONGO_USERNAME, MONGO_PASSWORD, MONGO_PATH } = process.env;
  const mongoURI: string = `${MONGO_SERVICE}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_PATH}`;
  return new MongoClient(mongoURI);
};

export { AppMongoClient };
