import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { FeedbacksMongoDbPersistence } from '../persistence/FeedbacksMongoDbPersistence';
import { FeedbacksFilePersistence } from '../persistence/FeedbacksFilePersistence';
import { FeedbacksMemoryPersistence } from '../persistence/FeedbacksMemoryPersistence';
import { FeedbacksController } from '../logic/FeedbacksController';
import { FeedbacksCommandableHttpServiceV1 } from '../services/version1/FeedbacksCommandableHttpServiceV1';

export class FeedbacksServiceFactory extends Factory {
	public static Descriptor = new Descriptor("service-feedbacks", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("service-feedbacks", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("service-feedbacks", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("service-feedbacks", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("service-feedbacks", "controller", "default", "*", "1.0");
	public static CmdHttpServiceDescriptor = new Descriptor("service-feedbacks", "service", "commandable-http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(FeedbacksServiceFactory.MemoryPersistenceDescriptor, FeedbacksMemoryPersistence);
		this.registerAsType(FeedbacksServiceFactory.FilePersistenceDescriptor, FeedbacksFilePersistence);
		this.registerAsType(FeedbacksServiceFactory.MongoDbPersistenceDescriptor, FeedbacksMongoDbPersistence);
		this.registerAsType(FeedbacksServiceFactory.ControllerDescriptor, FeedbacksController);
		this.registerAsType(FeedbacksServiceFactory.CmdHttpServiceDescriptor, FeedbacksCommandableHttpServiceV1);
	}
	
}
