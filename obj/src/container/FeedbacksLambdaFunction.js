"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.FeedbacksLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const FeedbacksServiceFactory_1 = require("../build/FeedbacksServiceFactory");
class FeedbacksLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("feedbacks", "User feedbacks function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-feedbacks', 'controller', 'default', '*', '*'));
        this._factories.add(new FeedbacksServiceFactory_1.FeedbacksServiceFactory());
    }
}
exports.FeedbacksLambdaFunction = FeedbacksLambdaFunction;
exports.handler = new FeedbacksLambdaFunction().getHandler();
//# sourceMappingURL=FeedbacksLambdaFunction.js.map