import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
export interface IFeedbacksController {
    getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>>;
    getFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1>;
    sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1): Promise<FeedbackV1>;
    replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1): Promise<FeedbackV1>;
    deleteFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1>;
}
