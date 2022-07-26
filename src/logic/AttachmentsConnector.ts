import { ReferenceV1 } from 'client-attachments-node';
import { IAttachmentsClientV1 } from 'client-attachments-node';

import { FeedbackV1 } from '../data/version1/FeedbackV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(feedback: FeedbackV1): string[] {
        let ids: string[] = [];

        for (let pic of feedback.pics) {
            if (pic.id)
                ids.push(pic.id);
        }

        for (let doc of feedback.docs) {
            if (doc.id)
                ids.push(doc.id);
        }

        return ids;
    }

    public async addAttachments(correlationId: string, feedback: FeedbackV1): Promise<void> {
        
        if (this._attachmentsClient == null || feedback == null)
            return;

        let ids = this.extractAttachmentIds(feedback);
        let reference = new ReferenceV1(feedback.id, 'feedback');
        await this._attachmentsClient.addAttachments(correlationId, reference, ids)
    }

    public async removeAttachments(correlationId: string, feedback: FeedbackV1): Promise<void> {
        
        if (this._attachmentsClient == null || feedback == null)
            return;

        let ids = this.extractAttachmentIds(feedback);
        let reference = new ReferenceV1(feedback.id, 'feedback');
        await this._attachmentsClient.removeAttachments(correlationId, reference, ids);
    }

}