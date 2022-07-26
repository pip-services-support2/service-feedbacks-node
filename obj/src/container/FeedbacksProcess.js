"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const client_attachments_node_1 = require("client-attachments-node");
const FeedbacksServiceFactory_1 = require("../build/FeedbacksServiceFactory");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
class FeedbacksProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("feedbacks", "User feedbacks microservice");
        this._factories.add(new FeedbacksServiceFactory_1.FeedbacksServiceFactory);
        this._factories.add(new client_attachments_node_1.AttachmentsClientFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
    }
}
exports.FeedbacksProcess = FeedbacksProcess;
//# sourceMappingURL=FeedbacksProcess.js.map