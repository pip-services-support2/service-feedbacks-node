import { IAttachmentsClientV1 } from 'client-attachments-node';
import { FeedbackV1 } from '../data/version1/FeedbackV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds;
    addAttachments(correlationId: string, feedback: FeedbackV1): Promise<void>;
    removeAttachments(correlationId: string, feedback: FeedbackV1): Promise<void>;
}
