"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallsController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const repository_1 = require("@loopback/repository");
const wall_repository_1 = require("../repositories/wall.repository");
const models_1 = require("../models");
class WallsController {
    constructor() {
    }
    async getAll() {
        return await this.repository.find();
    }
    async getById(id) {
        return await this.repository.findById(id);
    }
    async create(wall) {
        return await this.repository.create(wall);
    }
    async update(id, wall) {
        await this.repository.update(wall);
    }
    async del(id, wall) {
        await this.repository.delete(wall);
    }
}
(0, tslib_1.__decorate)([
    (0, repository_1.repository)(wall_repository_1.WallRepository),
    (0, tslib_1.__metadata)("design:type", wall_repository_1.WallRepository)
], WallsController.prototype, "repository", void 0);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/walls'),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WallsController.prototype, "getAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/walls/{id}'),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WallsController.prototype, "getById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/walls'),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [models_1.Wall]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WallsController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/walls/{id}'),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, models_1.Wall]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WallsController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/walls/{id}'),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, models_1.Wall]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], WallsController.prototype, "del", null);
exports.WallsController = WallsController;
//# sourceMappingURL=walls.controller.js.map