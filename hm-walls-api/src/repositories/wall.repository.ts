import {
  CrudRepositoryImpl,
  Filter,
  AnyObject,
  DataObject,
} from '@loopback/repository';
import {Wall} from '../models/wall.model';
import {WallDataSource} from './datasources/wall.datasource';
import {WallAzureTableConnector} from './datasources/wallAzureTableConnector';

export class WallRepository extends CrudRepositoryImpl<
  Wall,
  typeof Wall.prototype.id
> {
  private allEntities: Wall[];
  private refreshAllEntities: boolean;
  private azure: WallAzureTableConnector;
  constructor() {
    const ds = new WallDataSource();
    super(ds, Wall);
    this.azure = this.dataSource.connector as WallAzureTableConnector;
    this.refreshAllEntities = false;
  }
  public async find(
    filter?: Filter<Wall>,
    options?: AnyObject,
  ): Promise<Wall[]> {
    console.log('wall-repository:find', filter, options);
    if (!filter && !this.refreshAllEntities && this.allEntities) {
      return this.allEntities;
    }
    const entities = await this.azure.find(Wall, filter, options);
    const walls = 
    entities.map((entity: DataObject<Wall>) => entity as Wall);
    if (!filter) {
      this.allEntities = walls;
      this.refreshAllEntities = false;
    }
    return walls;
  }
  public async create(entity: Wall, options?: AnyObject): Promise<Wall> {
    console.log('wall-repository:create', entity, options);
    if (!entity.id || entity.id === 0) {
      const allEntities = await this.find();
      const lastId = allEntities.reduce(
        (agg: number, cur: Wall) => (agg = Math.max(agg, cur.id)),
        0,
      );
      entity.id = lastId + 1;
    }
    const created = await this.azure.create(Wall, entity, options);
    this.refreshAllEntities = true;
    return created as Wall;
  }
  public async update(entity: Wall, options?: AnyObject): Promise<void> {
    console.log('wall-repository:update', entity, options);
    return new Promise<void>((resolve, reject) => {
      if (this.azure.update == null) {
        throw new Error('This method is not defined');
      }
      this.azure
        .update(Wall, entity, options)
        .then((updated: boolean) => (updated ? resolve() : reject('not updated')));
    });
  }
  public async delete(entity: Wall, options?: AnyObject): Promise<void> {
    console.log('wall-repository:delete', entity, options);
    return new Promise<void>((resolve, reject) => {
      if (this.azure.delete == null) {
        throw new Error('This method is not defined');
      }
      this.azure
        .delete(Wall, entity, options)
        .then((deleted: boolean) => (deleted ? resolve() : reject('not deleted')));
    });
  }
}
