import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

// DataSource for command line (cli) usage
// load the environment variable from .env
config();

// TypeORM DataSource Options
const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['**/*.entity.{js,ts}'],
  migrations: [`${__dirname}/../../db/typeorm/migrations/*.{js,ts}`],
};

// console.log(dataSourceOptions);

// Create TypeORM DataSource
const devDataSource = new DataSource(dataSourceOptions);

export default devDataSource;
