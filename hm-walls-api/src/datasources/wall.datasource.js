"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallDataSource = void 0;
const tslib_1 = require("tslib");
const config = (0, tslib_1.__importStar)(require("./wall.datasource.json"));
const wallAzureTableConnector_1 = require("./wallAzureTableConnector");
class WallDataSource {
    constructor() {
        this.settings = config;
        this.connector = new wallAzureTableConnector_1.WallAzureTableConnector(this.settings);
    }
}
exports.WallDataSource = WallDataSource;
//# sourceMappingURL=wall.datasource.js.map