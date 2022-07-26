import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { FeedbacksServiceFactory } from '../build/FeedbacksServiceFactory';

export class FeedbacksLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("feedbacks", "User feedbacks function");
        this._dependencyResolver.put('controller', new Descriptor('service-feedbacks', 'controller', 'default', '*', '*'));
        this._factories.add(new FeedbacksServiceFactory());
    }
}

export const handler = new FeedbacksLambdaFunction().getHandler();