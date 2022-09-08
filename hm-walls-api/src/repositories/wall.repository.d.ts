import { CrudRepositoryImpl, Filter, AnyObject } from '@loopback/repository';
import { Wall } from '../models/wall.model';
export declare class WallRepository extends CrudRepositoryImpl<Wall, typeof Wall.prototype.id> {
    private allEntities;
    private refreshAllEntities;
    private azure;
    constructor();
    find(filter?: Filter<Wall>, options?: AnyObject): Promise<Wall[]>;
    create(entity: Wall, options?: AnyObject): Promise<Wall>;
    update(entity: Wall, options?: AnyObject): Promise<void>;
    delete(entity: Wall, options?: AnyObject): Promise<void>;
}
