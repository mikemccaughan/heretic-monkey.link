"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallRepository = void 0;
const repository_1 = require("@loopback/repository");
const wall_model_1 = require("../models/wall.model");
const wall_datasource_1 = require("../datasources/wall.datasource");
class WallRepository extends repository_1.CrudRepositoryImpl {
    constructor() {
        const ds = new wall_datasource_1.WallDataSource();
        super(ds, wall_model_1.Wall);
        this.azure = this.dataSource.connector;
        this.refreshAllEntities = false;
    }
    async find(filter, options) {
        console.log('wall-repository:find', filter, options);
        if (!filter && !this.refreshAllEntities && this.allEntities) {
            return this.allEntities;
        }
        const entities = await this.azure.find(wall_model_1.Wall, filter, options);
        const walls = entities.map((entity) => entity);
        if (!filter) {
            this.allEntities = walls;
            this.refreshAllEntities = false;
        }
        return walls;
    }
    async create(entity, options) {
        console.log('wall-repository:create', entity, options);
        if (!entity.id || entity.id === 0) {
            const allEntities = await this.find();
            const lastId = allEntities.reduce((agg, cur) => (agg = Math.max(agg, cur.id)), 0);
            entity.id = lastId + 1;
        }
        const created = await this.azure.create(wall_model_1.Wall, entity, options);
        this.refreshAllEntities = true;
        return created;
    }
    async update(entity, options) {
        console.log('wall-repository:update', entity, options);
        return new Promise((resolve, reject) => {
            if (this.azure.update == null) {
                throw new Error('This method is not defined');
            }
            this.azure
                .update(wall_model_1.Wall, entity, options)
                .then((updated) => (updated ? resolve() : reject('not updated')));
        });
    }
    async delete(entity, options) {
        console.log('wall-repository:delete', entity, options);
        return new Promise((resolve, reject) => {
            if (this.azure.delete == null) {
                throw new Error('This method is not defined');
            }
            this.azure
                .delete(wall_model_1.Wall, entity, options)
                .then((deleted) => (deleted ? resolve() : reject('not deleted')));
        });
    }
}
exports.WallRepository = WallRepository;
//# sourceMappingURL=wall.repository.js.map