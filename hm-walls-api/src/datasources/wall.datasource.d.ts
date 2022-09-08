import { DataSource } from '@loopback/repository';
import { WallAzureTableConnector } from './wallAzureTableConnector';
export declare class WallDataSource implements DataSource {
    name: 'wall';
    connector: WallAzureTableConnector;
    settings: {
        connectionString: string;
    };
    constructor();
}
