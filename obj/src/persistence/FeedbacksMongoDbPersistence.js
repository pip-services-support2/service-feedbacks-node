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
exports.FeedbacksMongoDbPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_mongodb_nodex_1 = require("pip-services3-mongodb-nodex");
class FeedbacksMongoDbPersistence extends pip_services3_mongodb_nodex_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('feedbacks');
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ title: { $regex: searchRegex } });
            searchCriteria.push({ content: { $regex: searchRegex } });
            searchCriteria.push({ reply: { $regex: searchRegex } });
            searchCriteria.push({ 'sender.name': { $regex: searchRegex } });
            searchCriteria.push({ 'sender.email': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let category = filter.getAsNullableString('category');
        if (category != null)
            criteria.push({ category: category });
        let app = filter.getAsNullableString('app');
        if (app != null)
            criteria.push({ app: app });
        let type = filter.getAsNullableString('type');
        if (type != null)
            criteria.push({ type: type });
        let senderId = filter.getAsNullableInteger('sender_id');
        if (senderId != null)
            criteria.push({ 'sender.id': senderId });
        let senderEmail = filter.getAsNullableInteger('sender_email');
        if (senderEmail != null)
            criteria.push({ 'sender.email': senderEmail });
        let replierId = filter.getAsNullableInteger('replier_id');
        if (replierId != null)
            criteria.push({ 'replier.id': replierId });
        let replied = filter.getAsNullableBoolean('replied');
        if (replied != null)
            criteria.push({ 'reply_time': { $exists: replied } });
        let fromSentTime = filter.getAsNullableDateTime('from_sent_time');
        if (fromSentTime != null)
            criteria.push({ sent_time: { $gte: fromSentTime } });
        let toSentTime = filter.getAsNullableDateTime('to_sent_time');
        if (toSentTime != null)
            criteria.push({ sent_time: { $lt: toSentTime } });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, '-sent_time', null);
        });
    }
}
exports.FeedbacksMongoDbPersistence = FeedbacksMongoDbPersistence;
//# sourceMappingURL=FeedbacksMongoDbPersistence.js.map