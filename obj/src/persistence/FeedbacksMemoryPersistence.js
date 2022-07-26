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
exports.FeedbacksMemoryPersistence = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
class FeedbacksMemoryPersistence extends pip_services3_data_nodex_1.IdentifiableMemoryPersistence {
    constructor() {
        super();
    }
    matchString(value, search) {
        if (value == null && search == null)
            return true;
        if (value == null || search == null)
            return false;
        return value.toLowerCase().indexOf(search) >= 0;
    }
    matchSearch(item, search) {
        search = search.toLowerCase();
        if (this.matchString(item.title, search))
            return true;
        if (this.matchString(item.content, search))
            return true;
        if (this.matchString(item.reply, search))
            return true;
        if (item.sender && this.matchString(item.sender.name, search))
            return true;
        if (item.sender && this.matchString(item.sender.email, search))
            return true;
        return false;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let search = filter.getAsNullableString('search');
        let id = filter.getAsNullableString('id');
        let category = filter.getAsNullableString('category');
        let app = filter.getAsNullableString('app');
        let senderId = filter.getAsNullableString('sender_id');
        let senderEmail = filter.getAsNullableString('sender_email');
        let replierId = filter.getAsNullableString('replier_id');
        let fromSentTime = filter.getAsNullableDateTime('from_sent_time');
        let toSentTime = filter.getAsNullableDateTime('to_sent_time');
        let replied = filter.getAsNullableBoolean('replied');
        return (item) => {
            if (id != null && id != item.id)
                return false;
            if (category != null && category != item.category)
                return false;
            if (app != null && app != item.app)
                return false;
            if (senderId != null && item.sender && senderId != item.sender.id)
                return false;
            if (senderEmail != null && item.sender && senderEmail != item.sender.email)
                return false;
            if (replierId != null && item.replier && replierId != item.replier.id)
                return false;
            if (replied != null) {
                if (replied && item.reply_time == null)
                    return false;
                if (!replied && item.reply_time != null)
                    return false;
            }
            if (fromSentTime != null && item.sent_time >= fromSentTime)
                return false;
            if (toSentTime != null && item.sent_time < toSentTime)
                return false;
            if (search != null && !this.matchSearch(item, search))
                return false;
            return true;
        };
    }
    getPageByFilter(correlationId, filter, paging) {
        const _super = Object.create(null, {
            getPageByFilter: { get: () => super.getPageByFilter }
        });
        return __awaiter(this, void 0, void 0, function* () {
            return yield _super.getPageByFilter.call(this, correlationId, this.composeFilter(filter), paging, null, null);
        });
    }
}
exports.FeedbacksMemoryPersistence = FeedbacksMemoryPersistence;
//# sourceMappingURL=FeedbacksMemoryPersistence.js.map