import { ConnectionOptions, createConnection } from "typeorm";

const environments: { [key: string]: ConnectionOptions } = {
  default: {
    "name": "default",
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "database": "extramile-dev",
    "username": "postgres",
    "password": "postgres",
    "synchronize": true,
    "logging": "all",
    "entities": ["src/entity/**/*.ts"],
    "migrations": ["src/migration/**/*.ts"],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration"
    }
  },
  production: {
    type: "postgres",
    extra: { ssl: true },
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: "all",
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
  }
};


const db: ConnectionOptions = process.env.NODE_ENV == "production" ? environments["production"] : environments["default"];

export const dbConnection = async () => await createConnection(db);


