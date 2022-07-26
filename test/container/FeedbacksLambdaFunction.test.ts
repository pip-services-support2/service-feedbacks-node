const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';

import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../../src/data/version1/FeedbackV1';
import { FeedbacksLambdaFunction } from '../../src/container/FeedbacksLambdaFunction';

let FEEDBACK = <FeedbackV1>{
    category: 'general',
    title: 'Test',
    content: 'This is just a test'
};
let USER1 = <PartyReferenceV1>{
    id: '1',
    name: 'Test User',
    email: 'test@digitallivingsoftware.com'
};
let USER2 = <PartyReferenceV1>{
    id: '2',
    name: 'Admin User',
    email: 'admin@digitallivingsoftware.com'
};

suite('FeedbacksLambdaFunction', ()=> {
    let lambda: FeedbacksLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-feedbacks:persistence:memory:default:1.0',
            'controller.descriptor', 'service-feedbacks:controller:default:default:1.0'
        );

        lambda = new FeedbacksLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        let feedback1, feedback2;
        // Send one feedback
        let feedback = await lambda.act(
            {
                role: 'feedbacks',
                cmd: 'send_feedback',
                feedback: FEEDBACK,
                user: USER1
            }
        );

        assert.isObject(feedback);
        assert.equal(feedback.category, FEEDBACK.category);
        assert.equal(feedback.content, FEEDBACK.content);
        assert.equal(feedback.sender.id, USER1.id);
        assert.equal(feedback.sender.name, USER1.name);
        assert.isDefined(feedback.sent_time);
        assert.isUndefined(feedback.reply_time);

        feedback1 = feedback;

        // Send another feedback
        feedback = await lambda.act(
            {
                role: 'feedbacks',
                cmd: 'send_feedback',
                feedback: FEEDBACK,
                user: null //USER2
            }
        );

        assert.isObject(feedback);
        assert.equal(feedback.category, FEEDBACK.category);
        assert.equal(feedback.content, FEEDBACK.content);
        // assert.equal(feedback.sender.id, USER2.id);
        // assert.equal(feedback.sender.name, USER2.name);
        assert.isDefined(feedback.sent_time);
        assert.isUndefined(feedback.reply_time);

        feedback2 = feedback;

        // Get all feedbacks
        let feedbacks = await lambda.act(
            {
                role: 'feedbacks',
                cmd: 'get_feedbacks'
            }
        );

        assert.isObject(feedbacks);
        assert.lengthOf(feedbacks.data, 2);

        // Reply the feedback
        feedback = await lambda.act(
            {
                role: 'feedbacks',
                cmd: 'reply_feedback',
                feedback_id: feedback1.id,
                reply: 'This is a reply',
                user: USER2
            }
        );

        assert.isObject(feedback);
        assert.equal(feedback.reply, 'This is a reply');
        assert.equal(feedback.replier.id, USER2.id);
        assert.equal(feedback.replier.name, USER2.name);
        assert.isDefined(feedback.reply_time);

        feedback1 = feedback;

        // Delete feedback
        await lambda.act(
            {
                role: 'feedbacks',
                cmd: 'delete_feedback_by_id',
                feedback_id: feedback1.id
            }
        );

        // Try to get delete feedback
        feedback = await lambda.act(
            {
                role: 'feedbacks',
                cmd: 'get_feedback_by_id',
                feedback_id: feedback1.id
            }
        );

        assert.isNull(feedback || null);
    });
});