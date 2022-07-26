import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
import { IFeedbacksController } from './IFeedbacksController';
export declare class FeedbacksController implements IConfigurable, IReferenceable, ICommandable, IFeedbacksController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _attachmentsClient;
    private _attachmentsConnector;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>>;
    getFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1>;
    sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1): Promise<FeedbackV1>;
    replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1): Promise<FeedbackV1>;
    deleteFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1>;
}
