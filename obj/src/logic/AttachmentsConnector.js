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
exports.AttachmentsConnector = void 0;
const client_attachments_node_1 = require("client-attachments-node");
class AttachmentsConnector {
    constructor(_attachmentsClient) {
        this._attachmentsClient = _attachmentsClient;
    }
    extractAttachmentIds(feedback) {
        let ids = [];
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
    addAttachments(correlationId, feedback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._attachmentsClient == null || feedback == null)
                return;
            let ids = this.extractAttachmentIds(feedback);
            let reference = new client_attachments_node_1.ReferenceV1(feedback.id, 'feedback');
            yield this._attachmentsClient.addAttachments(correlationId, reference, ids);
        });
    }
    removeAttachments(correlationId, feedback) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._attachmentsClient == null || feedback == null)
                return;
            let ids = this.extractAttachmentIds(feedback);
            let reference = new client_attachments_node_1.ReferenceV1(feedback.id, 'feedback');
            yield this._attachmentsClient.removeAttachments(correlationId, reference, ids);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map