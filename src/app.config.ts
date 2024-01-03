import { cleanEnv, port, str } from "envalid";

const appEnvValidate = () => {
  cleanEnv(process.env, {
    APP_PORT: port(),
    MONGO_SERVICE: str(),
    MONGO_USERNAME: str(),
    MONGO_PASSWORD: str(),
    MONGO_PATH: str()
  });
};

export { appEnvValidate };
