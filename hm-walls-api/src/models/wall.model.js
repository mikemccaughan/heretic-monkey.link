"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wall = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Wall = class Wall extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        required: true,
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], Wall.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Wall.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'buffer',
    }),
    (0, tslib_1.__metadata)("design:type", Buffer)
], Wall.prototype, "file", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Wall.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'array',
        itemType: 'number',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], Wall.prototype, "resolutions", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'number',
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], Wall.prototype, "adultScore", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Wall.prototype, "category", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Wall.prototype, "canonical", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'buffer',
    }),
    (0, tslib_1.__metadata)("design:type", Buffer)
], Wall.prototype, "thumb", void 0);
Wall = (0, tslib_1.__decorate)([
    (0, repository_1.model)({ settings: {} }),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Wall);
exports.Wall = Wall;
//# sourceMappingURL=wall.model.js.map