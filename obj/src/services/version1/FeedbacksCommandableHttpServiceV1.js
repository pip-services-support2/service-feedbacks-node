"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksCommandableHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class FeedbacksCommandableHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/feedbacks');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-feedbacks', 'controller', 'default', '*', '1.0'));
    }
}
exports.FeedbacksCommandableHttpServiceV1 = FeedbacksCommandableHttpServiceV1;
//# sourceMappingURL=FeedbacksCommandableHttpServiceV1.js.map