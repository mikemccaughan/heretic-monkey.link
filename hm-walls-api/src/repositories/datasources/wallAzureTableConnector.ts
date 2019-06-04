import storage = require('azure-storage');
import {
  AnyObject,
  CrudConnector,
  Class,
  Entity,
  Model,
  DataObject,
  Where,
  Count,
  Command,
  Filter,
  WhereBuilder,
} from '@loopback/repository';
import {Wall} from '../../models';

export class WallAzureTableConnector implements CrudConnector {
  private wallService: storage.TableService;
  constructor(config: {connectionString: string}) {
    this.wallService = storage.createTableService(config.connectionString);
  }
  name: string = 'wall-azure-table';
  interfaces?: string[];
  configModel?: Model;
  isConnected = false;
  ids: number[] = [];

  private async ensureConnection(): Promise<void> {
    if (!this.isConnected) {
      return this.connect();
    }
  }

  private getNewId(): number {
    return this.ids.sort()[this.ids.length - 1] + 1;
  }

  private removeId(id: number): void {
    this.ids.splice(this.ids.indexOf(id), 1);
  }

  async connect(): Promise<void> {
    console.log('connect');
    return new Promise<void>((resolve, reject) => {
      this.wallService.createTableIfNotExists('walls', error => {
        if (error) {
          this.isConnected = false;
          reject(error);
        }
      });
      this.isConnected = true;
      this.wallService.queryEntities('walls', new storage.TableQuery(), undefined, (error, result) => {
        let allEntities = result.entries.map(entry => entry as Wall);
        this.ids = allEntities.map(entry => entry.id);
      });
      resolve();
    });
  }
  async disconnect(): Promise<void> {
    console.log('disconnect');
    return new Promise<void>((resolve, reject) => {
      try {
        this.wallService.removeAllListeners();
      } catch (e) {
        this.isConnected = false;
        reject(e);
      }

      this.isConnected = false;
      resolve();
    });
  }
  async ping(): Promise<void> {
    console.log('ping');
    return new Promise<void>((resolve, reject) => {
      this.wallService.getServiceStats(error => {
        if (error) {
          this.isConnected = false;
          reject(error);
        } else {
          this.isConnected = true;
          resolve();
        }
      });
    });
  }
  async create(
    modelClass: Class<Wall>,
    entity: DataObject<Wall>,
    options?: AnyObject,
  ): Promise<DataObject<Wall>> {
    console.log('create', modelClass, entity, options);
    await this.ensureConnection();
    entity.id = this.getNewId();
    const entGen = storage.TableUtilities.entityGenerator;
    const azureEntity = {
      PartitionKey: entGen.String(`walls`),
      RowKey: entGen.String(`wall${entity.id}`),
      id: entGen.Int32(entity.id),
      name: entity.name ? entGen.String(entity.name) : null,
      description: entity.description ? entGen.String(entity.description) : undefined,
      resolutions: entity.resolutions ? entGen.String(JSON.stringify(entity.resolutions)) : undefined,
      adultScore: entity.adultScore ? entGen.Int32(entity.adultScore) : undefined,
      category: entity.category ? entGen.String(entity.category) : undefined,
      canonical: entity.canonical ? entGen.String(entity.canonical) : undefined,
      file: entity.file ? entGen.Binary(entity.file as Buffer) : undefined,
      thumb: entity.thumb ? entGen.Binary(entity.thumb as Buffer) : undefined
    };
    Object.assign(entity, azureEntity)
    return new Promise<DataObject<Wall>>((resolve, reject) => {
      this.wallService.insertEntity<DataObject<Wall>>(
        'walls',
        entity,
        error => {
          if (error) {
            reject(error);
          }
        },
      );
      resolve();
    });
  }
  async createAll?(
    modelClass: Class<Wall>,
    entities: DataObject<Wall>[],
    options?: AnyObject,
  ): Promise<DataObject<Wall>[]> {
    console.log('createAll', modelClass, entities, options);
    throw new Error('Method not implemented.');
  }
  save?(
    modelClass: Class<Wall>,
    entity: DataObject<Wall>,
    options?: AnyObject,
  ): Promise<DataObject<Wall>> {
    console.log('save', modelClass, entity, options);
    throw new Error('Method not implemented.');
  }
  private convertWhereToTableQuery(
    where?: Where<AnyObject>,
    query?: storage.TableQuery,
  ): storage.TableQuery | null {
    if (!where) {
      return null;
    }

    let queryNotUndefined: storage.TableQuery =
      query || new storage.TableQuery();
    // not used because TypeScript is weird (will raise the "could be undefined" error on where)
    // tslint:disable-next-line: no-unused
    let whereNotUndefined: Where<AnyObject> =
      where || new WhereBuilder().build();
    const keys = Object.keys(where);
    const props = keys.filter(key => !['and', 'or'].includes(key));
    props.forEach(
      prop =>
        (queryNotUndefined = queryNotUndefined.where(
          `${prop} eq ?`,
          where[prop],
        )),
    );
    const andsOrs = keys.filter(key => ['and', 'or'].includes(key));
    andsOrs.forEach(andOr => {
      const andOrWhere = {
        ...where[andOr],
      };
      this.convertWhereToTableQuery(andOrWhere, queryNotUndefined);
    });

    return queryNotUndefined;
  }
  async find(
    modelClass: Class<Wall>,
    filter?: Filter<AnyObject>,
    options?: AnyObject,
  ): Promise<DataObject<Wall>[]> {
    console.log('find', modelClass, filter, options);
    if (filter && filter.include != null && filter.include.length) {
      throw new Error(
        'The include property of Filter<T> is not implemented for Azure Tables',
      );
    }
    if (filter && filter.offset != null) {
      throw new Error(
        'The offset property of Filter<T> is not implemented for Azure Tables',
      );
    }
    if (filter && filter.skip != null) {
      throw new Error(
        'The skip property of Filter<T> is not implemented for Azure Tables',
      );
    }
    await this.ensureConnection();
    switch (modelClass.name) {
      case 'Wall':
        return new Promise<DataObject<Wall>[]>((resolve, reject) => {
          let query =
            filter && filter.where
              ? this.convertWhereToTableQuery(filter.where) ||
                new storage.TableQuery()
              : new storage.TableQuery();
          if (filter && filter.fields !== undefined) {
            query = query.select(
              Object.keys(filter.fields).filter(key => filter.fields![key]),
            );
          }
          if (filter && filter.limit !== undefined) {
            query = query.top(filter.limit);
          }
          // TODO: Figure out continuation tokens
          // tslint:disable-next-line: no-unused
          let continuationToken:
            | storage.services.table.TableService.TableContinuationToken
            | undefined;
          this.wallService.queryEntities<DataObject<Wall>>(
            'walls',
            query,
            null,
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              if (!result) {
                reject('no result');
                return;
              }
              continuationToken = result.continuationToken;
              let entries = [...result.entries];
              if (filter && filter.order) {
                filter.order.forEach(orderBy => {
                  const [by, order] = orderBy.split(' ');
                  entries.sort((a: DataObject<Wall>, b: DataObject<Wall>) =>
                    // tslint:disable-next-line: no-any
                    (a as any)[by] > (b as any)[by]
                      ? order === 'DESC'
                        ? -1
                        : 1
                      : // tslint:disable-next-line: no-any
                      (a as any)[by] < (b as any)[by]
                      ? order === 'DESC'
                        ? 1
                        : -1
                      : 0,
                  );
                });
              }
              resolve(entries);
            },
          );
        });
      default:
        throw new Error(
          `Could not find a table with the name "${modelClass.name}".`,
        );
    }
  }
  async findById?<IdType>(
    modelClass: Class<Wall>,
    id: IdType,
    options?: AnyObject,
  ): Promise<DataObject<Wall>> {
    console.log('findById', modelClass, id, options);
    await this.ensureConnection();
    switch (modelClass.name) {
      case 'Wall':
        return new Promise<DataObject<Wall>>((resolve, reject) => {
          this.wallService.retrieveEntity<DataObject<Wall>>(
            'walls',
            'id',
            id.toString(),
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              if (!result) {
                reject('no result');
                return;
              }
              resolve(result);
            },
          );
        });
      default:
        throw new Error(
          `Could not find a table with the name "${modelClass.name}".`,
        );
    }
  }
  async update?(
    modelClass: Class<Wall>,
    entity: DataObject<Wall>,
    options?: AnyObject,
  ): Promise<boolean> {
    console.log('update', modelClass, entity, options);
    await this.ensureConnection();
    switch (modelClass.name) {
      case 'Wall':
        return new Promise<boolean>((resolve, reject) => {
          this.wallService.mergeEntity<DataObject<Wall>>(
            'walls',
            entity,
            error => {
              if (error) {
                reject(error);
                return;
              }
              resolve(true);
            },
          );
        });
      default:
        throw new Error(
          `Could not find a table with the name "${modelClass.name}".`,
        );
    }
  }
  async delete?(
    modelClass: Class<Wall>,
    entity: DataObject<Wall>,
    options?: AnyObject,
  ): Promise<boolean> {
    console.log('delete', modelClass, entity, options);
    await this.ensureConnection();
    switch (modelClass.name) {
      case 'Wall':
        return new Promise<boolean>((resolve, reject) => {
          this.wallService.deleteEntity<DataObject<Wall>>(
            'walls',
            entity,
            (error, result) => {
              if (error) {
                reject(error);
                return;
              }
              if (!result) {
                reject('no result');
                return;
              }
              resolve(result.isSuccessful);
            },
          );
        });
        break;
      default:
        throw new Error(
          `Could not find a table with the name "${modelClass.name}".`,
        );
    }
  }
  updateAll(
    modelClass: Class<Wall>,
    data: DataObject<Wall>,
    where?: Where<Wall>,
    options?: AnyObject,
  ): Promise<Count> {
    console.log('updateAll', modelClass, data, where, options);
    throw new Error('Method not implemented.');
  }
  async updateById?<IdType>(
    modelClass: Class<Wall>,
    id: IdType,
    data: DataObject<Wall>,
    options?: AnyObject,
  ): Promise<boolean> {
    console.log('updateById', modelClass, id, data, options);
    if (Entity.getIdOf(data) !== id) {
      throw new Error(
        `The id passed, "${id}" did not match the id of the entity passed, ${data}`,
      );
    }
    await this.ensureConnection();
    switch (modelClass.name) {
      case 'Wall':
        return new Promise<boolean>((resolve, reject) => {
          this.wallService.mergeEntity<DataObject<Wall>>(
            'walls',
            data,
            error => {
              if (error) {
                reject(error);
                return;
              }
              resolve(true);
            },
          );
        });
        break;
      default:
        throw new Error(
          `Could not find a table with the name "${modelClass.name}".`,
        );
    }
  }
  async replaceById?<IdType>(
    modelClass: Class<Wall>,
    id: IdType,
    data: DataObject<Wall>,
    options?: AnyObject,
  ): Promise<boolean> {
    console.log('replaceById', modelClass, id, data, options);
    if (Entity.getIdOf(data) !== id) {
      throw new Error(
        `The id passed, "${id}" did not match the id of the entity passed, ${data}`,
      );
    }
    await this.ensureConnection();
    switch (modelClass.name) {
      case 'Wall':
        return new Promise<boolean>((resolve, reject) => {
          this.wallService.replaceEntity<DataObject<Wall>>(
            'walls',
            data,
            error => {
              if (error) {
                reject(error);
                return;
              }
              resolve(true);
            },
          );
        });
        break;
      default:
        throw new Error(
          `Could not find a table with the name "${modelClass.name}".`,
        );
    }
  }
  async deleteAll(
    modelClass: Class<Wall>,
    where?: Where<Wall>,
    options?: AnyObject,
  ): Promise<Count> {
    console.log('deleteAll', modelClass, where, options);
    const deleteEntity = this.delete;
    if (!deleteEntity) {
      throw new Error('Cannot deleteAll if delete is not defined');
    }
    await this.ensureConnection();
    const entities = await this.find(modelClass, {where}, options);
    entities.forEach(async entity => {
      await deleteEntity(modelClass, entity, options);
    });
    throw new Error('Method not implemented.');
  }
  async deleteById?<IdType>(
    modelClass: Class<Wall>,
    id: IdType,
    options?: AnyObject,
  ): Promise<boolean> {
    console.log('deleteById', modelClass, id, options);
    const findById = this.findById;
    if (!findById) {
      throw new Error('Cannot deleteById if findById is not defined');
    }
    const deleteEntity = this.delete;
    if (!deleteEntity) {
      throw new Error('Cannot deleteAll if delete is not defined');
    }
    await this.ensureConnection();
    const entity = await findById(modelClass, id, options);
    return await deleteEntity(modelClass, entity, options);
  }
  async count(
    modelClass: Class<Wall>,
    where?: Where<Wall>,
    options?: AnyObject,
  ): Promise<Count> {
    console.log('count', modelClass, where, options);
    await this.ensureConnection();
    const entities = await this.find(modelClass, {where}, options);
    return {count: entities.length};
  }
  async exists?<IdType>(
    modelClass: Class<Wall>,
    id: IdType,
    options?: AnyObject,
  ): Promise<boolean> {
    console.log('exists', modelClass, id, options);
    const findById = this.findById;
    if (!findById) {
      throw new Error('Cannot exists if findById is not defined');
    }
    await this.ensureConnection();
    const entity = await findById(modelClass, id, options);
    return entity != null;
  }
  execute?(
    command: Command,
    parameters: any[] | AnyObject,
    options?: AnyObject,
  ): Promise<AnyObject> {
    console.log('execute', command, parameters, options);
    throw new Error('Method not implemented.');
  }
}
