import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { AnyValueMap } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
import { IFeedbacksPersistence } from '../persistence/IFeedbacksPersistence';
import { IFeedbacksController } from './IFeedbacksController';
import { FeedbacksCommandSet } from './FeedbacksCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class FeedbacksController implements IConfigurable, IReferenceable, ICommandable, IFeedbacksController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-feedbacks:persistence:*:*:1.0',
        'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(FeedbacksController._defaultConfig);
    private _persistence: IFeedbacksPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: FeedbacksCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IFeedbacksPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new FeedbacksCommandSet(this);
        return this._commandSet;
    }

    public async getFeedbacks(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1> {
        return await this._persistence.getOneById(correlationId, feedbackId);
    }

    public async sendFeedback(correlationId: string, feedback: FeedbackV1, user: PartyReferenceV1): Promise<FeedbackV1> {
        let newFeedback: FeedbackV1 = null;

        if (user != null)
            feedback.sender = user;
        feedback.sent_time = new Date();

        newFeedback = await this._persistence.create(correlationId, feedback);

        await this._attachmentsConnector.addAttachments(correlationId, newFeedback);

        return newFeedback;
    }

    public async replyFeedback(correlationId: string, feedbackId: string, reply: string, user: PartyReferenceV1): Promise<FeedbackV1> {

        let data: AnyValueMap = AnyValueMap.fromTuples(
            'reply_time', new Date(),
            'reply', reply,
            'replier', user
        );

        return await this._persistence.updatePartially(correlationId, feedbackId, data);
    }

    public async deleteFeedbackById(correlationId: string, feedbackId: string): Promise<FeedbackV1> {
        let oldFeedback: FeedbackV1 = await this._persistence.deleteById(correlationId, feedbackId);

        await this._attachmentsConnector.removeAttachments(correlationId, oldFeedback);

        return oldFeedback;
    }

}
