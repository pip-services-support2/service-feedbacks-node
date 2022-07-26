import { DataPage, FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { FeedbackV1 } from '../data/version1/FeedbackV1';
import { IFeedbacksPersistence } from './IFeedbacksPersistence';

export class FeedbacksMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<FeedbackV1, string> 
    implements IFeedbacksPersistence {

    constructor() {
        super('feedbacks');
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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

    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-sent_time', null);
    }

}
