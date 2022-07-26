import { FeedbacksFilePersistence } from '../../src/persistence/FeedbacksFilePersistence';
import { FeedbacksPersistenceFixture } from './FeedbacksPersistenceFixture';

suite('FeedbacksFilePersistence', ()=> {
    let persistence: FeedbacksFilePersistence;
    let fixture: FeedbacksPersistenceFixture;
    
    setup(async () => {
        persistence = new FeedbacksFilePersistence('./data/feedbacks.test.json');

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