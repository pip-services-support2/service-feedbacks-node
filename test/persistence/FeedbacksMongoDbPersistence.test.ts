import { ConfigParams } from 'pip-services3-commons-nodex';

import { FeedbacksMongoDbPersistence } from '../../src/persistence/FeedbacksMongoDbPersistence';
import { FeedbacksPersistenceFixture } from './FeedbacksPersistenceFixture';

suite('FeedbacksMongoDbPersistence', ()=> {
    let persistence: FeedbacksMongoDbPersistence;
    let fixture: FeedbacksPersistenceFixture;

    setup(async () => {
        var MONGO_DB = process.env["MONGO_DB"] || "test";
        var MONGO_COLLECTION = process.env["MONGO_COLLECTION"] || "feedbacks";
        var MONGO_SERVICE_HOST = process.env["MONGO_SERVICE_HOST"] || "localhost";
        var MONGO_SERVICE_PORT = process.env["MONGO_SERVICE_PORT"] || "27017";
        var MONGO_SERVICE_URI = process.env["MONGO_SERVICE_URI"];

        var dbConfig = ConfigParams.fromTuples(
            "collection", MONGO_COLLECTION,
            "connection.database", MONGO_DB,
            "connection.host", MONGO_SERVICE_HOST,
            "connection.port", MONGO_SERVICE_PORT,
            "connection.uri", MONGO_SERVICE_URI
        );

        persistence = new FeedbacksMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new FeedbacksPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });

    test('Send Feedback', async () => {
        await fixture.testSendFeedback();
    });

    test('Reply Feedback', async () => {
        await fixture.testReplyFeedback();
    });

    test('Get Feedback', async () => {
        await fixture.testGetFeedback();
    });

    test('Get Multiple Feedbacks', async () => {
        await fixture.testGetMultipleFeedbacks();
    });

    test('Delete Feedback', async () => {
        await fixture.testDeleteFeedback();
    });
    
});