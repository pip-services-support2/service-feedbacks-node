const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { PartyReferenceV1 } from '../../../src/data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../../../src/data/version1/FeedbackV1';
import { FeedbacksMemoryPersistence } from '../../../src/persistence/FeedbacksMemoryPersistence';
import { FeedbacksController } from '../../../src/logic/FeedbacksController';
import { FeedbacksCommandableHttpServiceV1 } from '../../../src/services/version1/FeedbacksCommandableHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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

suite('FeedbacksCommandableHttpServiceV1', ()=> {
    let service: FeedbacksCommandableHttpServiceV1;

    let rest: any;

    suiteSetup(async () => {
        let persistence = new FeedbacksMemoryPersistence();
        let controller = new FeedbacksController();

        service = new FeedbacksCommandableHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-feedbacks', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-feedbacks', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-feedbacks', 'service', 'commandable-http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    test('CRUD Operations', async () => {
        let feedback1, feedback2;

        // Send one feedback
        let feedback = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/feedbacks/send_feedback',
                {
                    feedback: FEEDBACK,
                    user: USER1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(feedback);
        assert.equal(feedback.category, FEEDBACK.category);
        assert.equal(feedback.content, FEEDBACK.content);
        assert.equal(feedback.sender.id, USER1.id);
        assert.equal(feedback.sender.name, USER1.name);
        assert.isDefined(feedback.sent_time);
        assert.isUndefined(feedback.reply_time);

        feedback1 = feedback;

        // Send another feedback
        feedback = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/feedbacks/send_feedback',
                {
                    feedback: FEEDBACK,
                    user: USER2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(feedback);
        assert.equal(feedback.category, FEEDBACK.category);
        assert.equal(feedback.content, FEEDBACK.content);
        assert.equal(feedback.sender.id, USER2.id);
        assert.equal(feedback.sender.name, USER2.name);
        assert.isDefined(feedback.sent_time);
        assert.isUndefined(feedback.reply_time);

        feedback2 = feedback;

        // Get all feedbacks
        let feedbacks = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/feedbacks/get_feedbacks',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(feedbacks);
        assert.lengthOf(feedbacks.data, 2);

        // Reply the feedback
        feedback = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/feedbacks/reply_feedback',
                {
                    feedback_id: feedback1.id,
                    reply: 'This is a reply',
                    user: USER2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(feedback);
        assert.equal(feedback.reply, 'This is a reply');
        assert.equal(feedback.replier.id, USER2.id);
        assert.equal(feedback.replier.name, USER2.name);
        assert.isDefined(feedback.reply_time);

        feedback1 = feedback;

        // Delete feedback
        await new Promise<any>((resolve, reject) => {
            rest.post('/v1/feedbacks/delete_feedback_by_id',
                {
                    feedback_id: feedback1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // Try to get delete feedback
        feedback = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/feedbacks/get_feedback_by_id',
                {
                    feedback_id: feedback1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(feedback || null);
    });
});