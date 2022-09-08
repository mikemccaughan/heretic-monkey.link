import { AnyObject, CrudConnector, Class, Model, DataObject, Where, Count, Command, Filter } from '@loopback/repository';
import { Wall } from '../models';
export declare class WallAzureTableConnector implements CrudConnector {
    private wallService;
    constructor(config: {
        connectionString: string;
    });
    name: string;
    interfaces?: string[];
    configModel?: Model;
    isConnected: boolean;
    ids: number[];
    private ensureConnection;
    private getNewId;
    private removeId;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    ping(): Promise<void>;
    create(modelClass: Class<Wall>, entity: DataObject<Wall>, options?: AnyObject): Promise<DataObject<Wall>>;
    createAll?(modelClass: Class<Wall>, entities: DataObject<Wall>[], options?: AnyObject): Promise<DataObject<Wall>[]>;
    save?(modelClass: Class<Wall>, entity: DataObject<Wall>, options?: AnyObject): Promise<DataObject<Wall>>;
    private convertWhereToTableQuery;
    find(modelClass: Class<Wall>, filter?: Filter<Wall>, options?: AnyObject): Promise<DataObject<Wall>[]>;
    findById?<IdType>(modelClass: Class<Wall>, id: IdType, options?: AnyObject): Promise<DataObject<Wall>>;
    update?(modelClass: Class<Wall>, entity: DataObject<Wall>, options?: AnyObject): Promise<boolean>;
    delete?(modelClass: Class<Wall>, entity: DataObject<Wall>, options?: AnyObject): Promise<boolean>;
    updateAll(modelClass: Class<Wall>, data: DataObject<Wall>, where?: Where<Wall>, options?: AnyObject): Promise<Count>;
    updateById?<IdType>(modelClass: Class<Wall>, id: IdType, data: DataObject<Wall>, options?: AnyObject): Promise<boolean>;
    replaceById?<IdType>(modelClass: Class<Wall>, id: IdType, data: DataObject<Wall>, options?: AnyObject): Promise<boolean>;
    deleteAll(modelClass: Class<Wall>, where?: Where<Wall>, options?: AnyObject): Promise<Count>;
    deleteById?<IdType>(modelClass: Class<Wall>, id: IdType, options?: AnyObject): Promise<boolean>;
    count(modelClass: Class<Wall>, where?: Where<Wall>, options?: AnyObject): Promise<Count>;
    exists?<IdType>(modelClass: Class<Wall>, id: IdType, options?: AnyObject): Promise<boolean>;
    execute?(command: Command, parameters: any[] | AnyObject, options?: AnyObject): Promise<AnyObject>;
}
