import {DataSource} from '@loopback/repository';
import * as config from './wall.datasource.json';
import {WallAzureTableConnector} from './wallAzureTableConnector';

export class WallDataSource implements DataSource {
  name: 'wall';
  connector: WallAzureTableConnector;
  settings: {connectionString: string};
  constructor() {
    this.settings = config;
    this.connector = new WallAzureTableConnector(this.settings);
  }
}
