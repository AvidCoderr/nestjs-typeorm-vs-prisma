/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license
 * that can be found at http://neekware.com/license/MIT.html
 */

import { registerAs } from "@nestjs/config";

import { environment } from "../environments/environment";

/**
 * Register app configuration
 * Usage: In NestJS service:
 * constructor(cfgService: ConfigService) {
 *  // get the application config (aka environment.ts)
 *  const config = cfgService.get('appConfig');
 *  // get the database config
 *  const config = cfgService.get('appConfig.dbConfig');
 *  // get environment variable
 *  const url = cfgService.get<string>('DATABASE_URL');
 * }
 */
export const AppConfiguration = registerAs('appConfig', () => ({
  ...environment,
  // add anything you want here, to make it available to all nestjs libs
  // via ConfigService
  // env: process.env.APP_ENV,
  // name: process.env.APP_NAME,
  // url: process.env.APP_URL,
  // port: process.env.APP_PORT,
}));
