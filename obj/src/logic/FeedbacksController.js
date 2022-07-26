"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbacksController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const FeedbacksCommandSet_1 = require("./FeedbacksCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class FeedbacksController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_nodex_2.DependencyResolver(FeedbacksController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new FeedbacksCommandSet_1.FeedbacksCommandSet(this);
        return this._commandSet;
    }
    getFeedbacks(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getPageByFilter(correlationId, filter, paging);
        });
    }
    getFeedbackById(correlationId, feedbackId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._persistence.getOneById(correlationId, feedbackId);
        });
    }
    sendFeedback(correlationId, feedback, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let newFeedback = null;
            if (user != null)
                feedback.sender = user;
            feedback.sent_time = new Date();
            newFeedback = yield this._persistence.create(correlationId, feedback);
            yield this._attachmentsConnector.addAttachments(correlationId, newFeedback);
            return newFeedback;
        });
    }
    replyFeedback(correlationId, feedbackId, reply, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = pip_services3_commons_nodex_3.AnyValueMap.fromTuples('reply_time', new Date(), 'reply', reply, 'replier', user);
            return yield this._persistence.updatePartially(correlationId, feedbackId, data);
        });
    }
    deleteFeedbackById(correlationId, feedbackId) {
        return __awaiter(this, void 0, void 0, function* () {
            let oldFeedback = yield this._persistence.deleteById(correlationId, feedbackId);
            yield this._attachmentsConnector.removeAttachments(correlationId, oldFeedback);
            return oldFeedback;
        });
    }
}
exports.FeedbacksController = FeedbacksController;
FeedbacksController._defaultConfig = pip_services3_commons_nodex_1.ConfigParams.fromTuples('dependencies.persistence', 'service-feedbacks:persistence:*:*:1.0', 'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0');
//# sourceMappingURL=FeedbacksController.js.map