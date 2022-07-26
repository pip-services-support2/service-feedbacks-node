const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { AnyValueMap } from 'pip-services3-commons-nodex';

import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';
import { FeedbackV1 } from '../../src/data/version1/FeedbackV1';
import { IFeedbacksPersistence } from '../../src/persistence/IFeedbacksPersistence';

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
let FEEDBACK1 = <FeedbackV1>{
    category: 'general',
    title: 'Test',
    content: 'This is just a test',
    sent_time: new Date(),
    sender: USER1
};
let FEEDBACK2 = <FeedbackV1>{
    category: 'general',
    title: 'Test',
    content: 'This is just a test',
    sent_time: new Date(),
    sender: USER2
};

export class FeedbacksPersistenceFixture {
    private _persistence: IFeedbacksPersistence;
    
    constructor(persistence: IFeedbacksPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public async testSendFeedback() {
        let feedback1;

        // Request a Feedback
        let feedback = await this._persistence.create(null, FEEDBACK1);

        assert.isObject(feedback);
        assert.equal(feedback.category, FEEDBACK1.category);
        assert.equal(feedback.title, FEEDBACK1.title);
        assert.equal(feedback.content, FEEDBACK1.content);
        assert.equal(feedback.sender.id, USER1.id);
        assert.equal(feedback.sender.name, USER1.name);
        assert.equal(feedback.sender.email, USER1.email);
        assert.isDefined(feedback.sent_time);
        assert.isUndefined(feedback.reply_time);;

        feedback1 = feedback;

        // Check that feedback was written
        feedback = await this._persistence.getOneById(null, feedback1.id);

        assert.isObject(feedback);
        assert.equal(feedback.category, FEEDBACK1.category);
        assert.equal(feedback.title, FEEDBACK1.title);
        assert.equal(feedback.content, FEEDBACK1.content);
        assert.equal(feedback.sender.id, USER1.id);
        assert.equal(feedback.sender.name, USER1.name);
        assert.equal(feedback.sender.email, USER1.email);
        assert.isDefined(feedback.sent_time);
        assert.isUndefined(feedback.reply_time);
    }

    public async testReplyFeedback() {
        let feedback1;
        
        // Request a Feedback
        let feedback = await this._persistence.create(null, FEEDBACK1);

        assert.isObject(feedback);
        feedback1 = feedback;

        // Reply a Feedback
        feedback = await this._persistence.updatePartially(
            null,
            feedback1.id,
            AnyValueMap.fromTuples(
                'reply', 'This is a test reply',
                'replier', USER2,
                'reply_time', new Date()
            )
        );

        assert.isObject(feedback);
        assert.equal(feedback.reply, 'This is a test reply')
        assert.isDefined(feedback.reply_time);

        feedback1 = feedback;

        // Check that reply was written
        feedback = await this._persistence.getOneById(null, feedback1.id);

        assert.isObject(feedback);
        assert.equal(feedback.sender.name, USER1.name);
        assert.equal(feedback.sender.email, USER1.email);
        assert.equal(feedback.category, FEEDBACK1.category);

        assert.isDefined(feedback.reply_time);
        assert.equal(feedback.replier.id, USER2.id);
        assert.equal(feedback.replier.name, USER2.name);
        assert.equal(feedback.replier.email, USER2.email);
        assert.equal(feedback.reply, 'This is a test reply');
    }

    public async testGetFeedback() {
        let feedback1;

        // Request a Feedback
        let feedback = await this._persistence.create(null, FEEDBACK1);

        assert.isObject(feedback);
        feedback1 = feedback;

        // Get a Feedback
        feedback = await this._persistence.getOneById(null, feedback1.id);

        assert.isObject(feedback);
        assert.equal(feedback.id, feedback1.id);
        assert.equal(feedback.sender.name, USER1.name);
        assert.equal(feedback.sender.email, USER1.email);
        assert.equal(feedback.category, FEEDBACK1.category);
    }

    public async testGetMultipleFeedbacks() {
        let feedback1, feedback2, feedback3;

        // Send feedback #1
        let feedback = await this._persistence.create(null, FEEDBACK1);

        assert.isObject(feedback);
        feedback1 = feedback;

        // Send feedback #2
        feedback = await this._persistence.create(null, FEEDBACK1);

        assert.isObject(feedback);
        feedback2 = feedback;

        // Send feedback #3
        feedback = await this._persistence.create(null, FEEDBACK2);

        assert.isObject(feedback);
        feedback3 = feedback;

        // Reply a feedback
        feedback = await this._persistence.updatePartially(
            null,
            feedback1.id,
            AnyValueMap.fromTuples(
                'reply', 'This is a reply',
                'replier', USER2,
                'reply_time', new Date()
            )
        );

        assert.isObject(feedback);
        feedback1 = feedback;

        // Get feedback
        let feedbacks = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({ replied: false }),
            new PagingParams()
        );

        assert.isObject(feedbacks);
        assert.lengthOf(feedbacks.data, 2);

        feedback = feedbacks.data[0];
        assert.isUndefined(feedback.reply_time);
        assert.equal(feedback.category, FEEDBACK1.category);
    }

    public async testDeleteFeedback() {
        let feedback1;

        // Request feedback
        let feedback = await this._persistence.create(null, FEEDBACK1);

        assert.isObject(feedback);
        feedback1 = feedback;

        // Get feedback
        feedback = await this._persistence.getOneById(null, feedback1.id);

        assert.isObject(feedback);

        // Delete feedback
        await this._persistence.deleteById(null, feedback1.id);

        // Get nothing
        feedback = await this._persistence.getOneById(null, feedback1.id);

        assert.isNull(feedback || null);
    }

}
