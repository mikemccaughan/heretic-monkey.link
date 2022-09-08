"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallAzureTableConnector = void 0;
const storage = require("azure-storage");
const repository_1 = require("@loopback/repository");
class WallAzureTableConnector {
    constructor(config) {
        this.name = 'wall-azure-table';
        this.isConnected = false;
        this.ids = [];
        this.wallService = storage.createTableService(config.connectionString);
    }
    async ensureConnection() {
        if (!this.isConnected) {
            return this.connect();
        }
    }
    getNewId() {
        return this.ids.sort()[this.ids.length - 1] + 1;
    }
    removeId(id) {
        this.ids.splice(this.ids.indexOf(id), 1);
    }
    async connect() {
        console.log('connect');
        return new Promise((resolve, reject) => {
            this.wallService.createTableIfNotExists('walls', error => {
                if (error) {
                    this.isConnected = false;
                    reject(error);
                }
            });
            this.isConnected = true;
            let continuationToken;
            this.wallService.queryEntities('walls', new storage.TableQuery(), continuationToken, (error, result) => {
                let allEntities = result.entries.map(entry => entry);
                this.ids = allEntities.map(entry => entry.id);
            });
            resolve(void (0));
        });
    }
    async disconnect() {
        console.log('disconnect');
        return new Promise((resolve, reject) => {
            try {
                this.wallService.removeAllListeners();
            }
            catch (e) {
                this.isConnected = false;
                reject(e);
            }
            this.isConnected = false;
            resolve();
        });
    }
    async ping() {
        console.log('ping');
        return new Promise((resolve, reject) => {
            this.wallService.getServiceStats(error => {
                if (error) {
                    this.isConnected = false;
                    reject(error);
                }
                else {
                    this.isConnected = true;
                    resolve();
                }
            });
        });
    }
    async create(modelClass, entity, options) {
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
            file: entity.file ? entGen.Binary(entity.file) : undefined,
            thumb: entity.thumb ? entGen.Binary(entity.thumb) : undefined
        };
        Object.assign(entity, azureEntity);
        return new Promise((resolve, reject) => {
            this.wallService.insertEntity('walls', entity, error => {
                if (error) {
                    reject(error);
                }
            });
            resolve(entity);
        });
    }
    async createAll(modelClass, entities, options) {
        console.log('createAll', modelClass, entities, options);
        throw new Error('Method not implemented.');
    }
    save(modelClass, entity, options) {
        console.log('save', modelClass, entity, options);
        throw new Error('Method not implemented.');
    }
    convertWhereToTableQuery(where, query) {
        if (!where) {
            return null;
        }
        let queryNotUndefined = query || new storage.TableQuery();
        // not used because TypeScript is weird (will raise the "could be undefined" error on where)
        // tslint:disable-next-line: no-unused
        let whereNotUndefined = where || new repository_1.WhereBuilder().build();
        const keys = Object.keys(where);
        const props = keys.filter(key => !['and', 'or'].includes(key));
        props.forEach(prop => (queryNotUndefined = queryNotUndefined.where(`${prop} eq ?`, where[prop])));
        const andsOrs = keys.filter(key => ['and', 'or'].includes(key));
        andsOrs.forEach(andOr => {
            const andOrWhere = {
                ...where[andOr],
            };
            this.convertWhereToTableQuery(andOrWhere, queryNotUndefined);
        });
        return queryNotUndefined;
    }
    async find(modelClass, filter, options) {
        console.log('find', modelClass, filter, options);
        if (filter && filter.include != null && filter.include.length) {
            throw new Error('The include property of Filter<T> is not implemented for Azure Tables');
        }
        if (filter && filter.offset != null) {
            throw new Error('The offset property of Filter<T> is not implemented for Azure Tables');
        }
        if (filter && filter.skip != null) {
            throw new Error('The skip property of Filter<T> is not implemented for Azure Tables');
        }
        await this.ensureConnection();
        switch (modelClass.name) {
            case 'Wall':
                return new Promise((resolve, reject) => {
                    let query = filter && filter.where
                        ? this.convertWhereToTableQuery(filter.where) ||
                            new storage.TableQuery()
                        : new storage.TableQuery();
                    if (filter && filter.fields !== undefined) {
                        query = query.select(Object.keys(filter.fields).filter(key => filter.fields[key]));
                    }
                    if (filter && filter.limit !== undefined) {
                        query = query.top(filter.limit);
                    }
                    // TODO: Figure out continuation tokens
                    // tslint:disable-next-line: no-unused
                    let continuationToken;
                    this.wallService.queryEntities('walls', query, continuationToken, (error, result) => {
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
                                entries.sort((a, b) => 
                                // tslint:disable-next-line: no-any
                                a[by] > b[by]
                                    ? order === 'DESC'
                                        ? -1
                                        : 1
                                    : // tslint:disable-next-line: no-any
                                        a[by] < b[by]
                                            ? order === 'DESC'
                                                ? 1
                                                : -1
                                            : 0);
                            });
                        }
                        resolve(entries);
                    });
                });
            default:
                throw new Error(`Could not find a table with the name "${modelClass.name}".`);
        }
    }
    async findById(modelClass, id, options) {
        console.log('findById', modelClass, id, options);
        await this.ensureConnection();
        switch (modelClass.name) {
            case 'Wall':
                return new Promise((resolve, reject) => {
                    this.wallService.retrieveEntity('walls', 'id', String(id), (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        if (!result) {
                            reject('no result');
                            return;
                        }
                        resolve(result);
                    });
                });
            default:
                throw new Error(`Could not find a table with the name "${modelClass.name}".`);
        }
    }
    async update(modelClass, entity, options) {
        console.log('update', modelClass, entity, options);
        await this.ensureConnection();
        switch (modelClass.name) {
            case 'Wall':
                return new Promise((resolve, reject) => {
                    this.wallService.mergeEntity('walls', entity, error => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(true);
                    });
                });
            default:
                throw new Error(`Could not find a table with the name "${modelClass.name}".`);
        }
    }
    async delete(modelClass, entity, options) {
        console.log('delete', modelClass, entity, options);
        await this.ensureConnection();
        switch (modelClass.name) {
            case 'Wall':
                return new Promise((resolve, reject) => {
                    this.wallService.deleteEntity('walls', entity, (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        if (!result) {
                            reject('no result');
                            return;
                        }
                        resolve(result.isSuccessful);
                    });
                });
                break;
            default:
                throw new Error(`Could not find a table with the name "${modelClass.name}".`);
        }
    }
    updateAll(modelClass, data, where, options) {
        console.log('updateAll', modelClass, data, where, options);
        throw new Error('Method not implemented.');
    }
    async updateById(modelClass, id, data, options) {
        console.log('updateById', modelClass, id, data, options);
        if (repository_1.Entity.getIdOf(data) !== id) {
            throw new Error(`The id passed, "${id}" did not match the id of the entity passed, ${data}`);
        }
        await this.ensureConnection();
        switch (modelClass.name) {
            case 'Wall':
                return new Promise((resolve, reject) => {
                    this.wallService.mergeEntity('walls', data, error => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(true);
                    });
                });
                break;
            default:
                throw new Error(`Could not find a table with the name "${modelClass.name}".`);
        }
    }
    async replaceById(modelClass, id, data, options) {
        console.log('replaceById', modelClass, id, data, options);
        if (repository_1.Entity.getIdOf(data) !== id) {
            throw new Error(`The id passed, "${id}" did not match the id of the entity passed, ${data}`);
        }
        await this.ensureConnection();
        switch (modelClass.name) {
            case 'Wall':
                return new Promise((resolve, reject) => {
                    this.wallService.replaceEntity('walls', data, error => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(true);
                    });
                });
                break;
            default:
                throw new Error(`Could not find a table with the name "${modelClass.name}".`);
        }
    }
    async deleteAll(modelClass, where, options) {
        console.log('deleteAll', modelClass, where, options);
        const deleteEntity = this.delete;
        if (!deleteEntity) {
            throw new Error('Cannot deleteAll if delete is not defined');
        }
        await this.ensureConnection();
        const entities = await this.find(modelClass, { where }, options);
        entities.forEach(async (entity) => {
            await deleteEntity(modelClass, entity, options);
        });
        throw new Error('Method not implemented.');
    }
    async deleteById(modelClass, id, options) {
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
    async count(modelClass, where, options) {
        console.log('count', modelClass, where, options);
        await this.ensureConnection();
        const entities = await this.find(modelClass, { where }, options);
        return { count: entities.length };
    }
    async exists(modelClass, id, options) {
        console.log('exists', modelClass, id, options);
        const findById = this.findById;
        if (!findById) {
            throw new Error('Cannot exists if findById is not defined');
        }
        await this.ensureConnection();
        const entity = await findById(modelClass, id, options);
        return entity != null;
    }
    execute(command, parameters, options) {
        console.log('execute', command, parameters, options);
        throw new Error('Method not implemented.');
    }
}
exports.WallAzureTableConnector = WallAzureTableConnector;
//# sourceMappingURL=wallAzureTableConnector.js.map