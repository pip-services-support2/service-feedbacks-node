import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class FeedbacksCommandableHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/feedbacks');
        this._dependencyResolver.put('controller', new Descriptor('service-feedbacks', 'controller', 'default', '*', '1.0'));
    }
}