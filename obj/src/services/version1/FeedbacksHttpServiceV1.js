"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class FeedbacksHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/feedbacks');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-feedbacks', 'controller', 'default', '*', '1.0'));
    }
}
exports.FeedbacksHttpServiceV1 = FeedbacksHttpServiceV1;
//# sourceMappingURL=FeedbacksHttpServiceV1.js.map