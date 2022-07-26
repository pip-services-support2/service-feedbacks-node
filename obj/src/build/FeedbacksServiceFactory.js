"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const FeedbacksMongoDbPersistence_1 = require("../persistence/FeedbacksMongoDbPersistence");
const FeedbacksFilePersistence_1 = require("../persistence/FeedbacksFilePersistence");
const FeedbacksMemoryPersistence_1 = require("../persistence/FeedbacksMemoryPersistence");
const FeedbacksController_1 = require("../logic/FeedbacksController");
const FeedbacksHttpServiceV1_1 = require("../services/version1/FeedbacksHttpServiceV1");
class FeedbacksServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(FeedbacksServiceFactory.MemoryPersistenceDescriptor, FeedbacksMemoryPersistence_1.FeedbacksMemoryPersistence);
        this.registerAsType(FeedbacksServiceFactory.FilePersistenceDescriptor, FeedbacksFilePersistence_1.FeedbacksFilePersistence);
        this.registerAsType(FeedbacksServiceFactory.MongoDbPersistenceDescriptor, FeedbacksMongoDbPersistence_1.FeedbacksMongoDbPersistence);
        this.registerAsType(FeedbacksServiceFactory.ControllerDescriptor, FeedbacksController_1.FeedbacksController);
        this.registerAsType(FeedbacksServiceFactory.HttpServiceDescriptor, FeedbacksHttpServiceV1_1.FeedbacksHttpServiceV1);
    }
}
exports.FeedbacksServiceFactory = FeedbacksServiceFactory;
FeedbacksServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-feedbacks", "factory", "default", "default", "1.0");
FeedbacksServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-feedbacks", "persistence", "memory", "*", "1.0");
FeedbacksServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-feedbacks", "persistence", "file", "*", "1.0");
FeedbacksServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-feedbacks", "persistence", "mongodb", "*", "1.0");
FeedbacksServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-feedbacks", "controller", "default", "*", "1.0");
FeedbacksServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-feedbacks", "service", "http", "*", "1.0");
//# sourceMappingURL=FeedbacksServiceFactory.js.map