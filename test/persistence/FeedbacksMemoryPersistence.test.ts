import { FeedbacksMemoryPersistence } from '../../src/persistence/FeedbacksMemoryPersistence';
import { FeedbacksPersistenceFixture } from './FeedbacksPersistenceFixture';

suite('FeedbacksMemoryPersistence', ()=> {
    let persistence: FeedbacksMemoryPersistence;
    let fixture: FeedbacksPersistenceFixture;
    
    setup(async () => {
        persistence = new FeedbacksMemoryPersistence();
        fixture = new FeedbacksPersistenceFixture(persistence);
        
        await persistence.open(null);
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