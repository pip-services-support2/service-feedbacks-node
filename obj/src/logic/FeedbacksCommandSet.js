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
exports.FeedbacksCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const PartyReferenceV1Schema_1 = require("../data/version1/PartyReferenceV1Schema");
const FeedbackV1Schema_1 = require("../data/version1/FeedbackV1Schema");
class FeedbacksCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetFeedbacksCommand());
        this.addCommand(this.makeGetFeedbackByIdCommand());
        this.addCommand(this.makeSendFeedbackCommand());
        this.addCommand(this.makeReplyFeedbackCommand());
        this.addCommand(this.makeDeleteFeedbackByIdCommand());
    }
    makeGetFeedbacksCommand() {
        return new pip_services3_commons_nodex_2.Command("get_feedbacks", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getFeedbacks(correlationId, filter, paging);
        }));
    }
    makeGetFeedbackByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_feedback_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('feedback_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let feedbackId = args.getAsNullableString("feedback_id");
            return yield this._logic.getFeedbackById(correlationId, feedbackId);
        }));
    }
    makeSendFeedbackCommand() {
        return new pip_services3_commons_nodex_2.Command("send_feedback", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('feedback', new FeedbackV1Schema_1.FeedbackV1Schema())
            .withOptionalProperty('user', new PartyReferenceV1Schema_1.PartyReferenceV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let feedback = args.get("feedback");
            let user = args.get("user");
            return yield this._logic.sendFeedback(correlationId, feedback, user);
        }));
    }
    makeReplyFeedbackCommand() {
        return new pip_services3_commons_nodex_2.Command("reply_feedback", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('feedback_id', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('reply', pip_services3_commons_nodex_6.TypeCode.String)
            .withRequiredProperty('user', new PartyReferenceV1Schema_1.PartyReferenceV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let feedbackId = args.getAsNullableString("feedback_id");
            let reply = args.getAsNullableString("reply");
            let user = args.get("user");
            return yield this._logic.replyFeedback(correlationId, feedbackId, reply, user);
        }));
    }
    makeDeleteFeedbackByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_feedback_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('feedback_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let feedbackId = args.getAsNullableString("feedback_id");
            return yield this._logic.deleteFeedbackById(correlationId, feedbackId);
        }));
    }
}
exports.FeedbacksCommandSet = FeedbacksCommandSet;
//# sourceMappingURL=FeedbacksCommandSet.js.map