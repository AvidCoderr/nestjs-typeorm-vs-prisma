import { cloneDeep as ldDeepClone, mergeWith as ldMergeWith } from "lodash";
import { DataSource, DataSourceOptions } from "typeorm";

import { ConfigModule, ConfigService } from "@nestjs/config";

/**
 * TypeORM database configuration
 */
export const typeOrmConfig = {
  imports: [ConfigModule],
  inject: [ConfigService],

  /**
   * Build TypeORM options
   * @param cfgService Nest Config Service
   * @returns return TypeORM options
   */
  useFactory: (cfgService: ConfigService): DataSourceOptions => {
    // get database config from environments
    const config = cfgService.get('appConfig.dbConfig');

    // get the database URL from environment
    const url = cfgService.get<string>('DATABASE_URL');

    // merge the options
    const options = ldMergeWith(
      ldDeepClone(config),
      { type: 'postgres', url },
      (dest, src) => (Array.isArray(dest) ? src : undefined)
    );

    return options;
  },

  /**
   * Create TypeORM DataSource and initialize it
   * @param options TypeORM database option
   * @returns
   */
  dataSourceFactory: async (
    options: DataSourceOptions
  ): Promise<DataSource> => {
    return await new DataSource(options).initialize();
  },
};
