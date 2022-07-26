import { ProcessContainer } from 'pip-services3-container-nodex';

import { AttachmentsClientFactory } from 'client-attachments-node';
import { FeedbacksServiceFactory } from '../build/FeedbacksServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

export class FeedbacksProcess extends ProcessContainer {

    public constructor() {
        super("feedbacks", "User feedbacks microservice");
        this._factories.add(new FeedbacksServiceFactory);
        this._factories.add(new AttachmentsClientFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
    }

}
