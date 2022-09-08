"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const SequenceActions = rest_1.RestBindings.SequenceActions;
let MySequence = class MySequence {
    constructor(findRoute, parseParams, invoke, send, reject) {
        this.findRoute = findRoute;
        this.parseParams = parseParams;
        this.invoke = invoke;
        this.send = send;
        this.reject = reject;
    }
    async handle(context) {
        try {
            const { request, response } = context;
            const route = this.findRoute(request);
            const args = await this.parseParams(request, route);
            const result = await this.invoke(route, args);
            this.send(response, result);
        }
        catch (err) {
            this.reject(context, err);
        }
    }
};
MySequence = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, context_1.inject)(SequenceActions.FIND_ROUTE)),
    (0, tslib_1.__param)(1, (0, context_1.inject)(SequenceActions.PARSE_PARAMS)),
    (0, tslib_1.__param)(2, (0, context_1.inject)(SequenceActions.INVOKE_METHOD)),
    (0, tslib_1.__param)(3, (0, context_1.inject)(SequenceActions.SEND)),
    (0, tslib_1.__param)(4, (0, context_1.inject)(SequenceActions.REJECT)),
    (0, tslib_1.__metadata)("design:paramtypes", [Function, Function, Function, Function, Function])
], MySequence);
exports.MySequence = MySequence;
//# sourceMappingURL=sequence.js.map