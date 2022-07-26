import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { AnyValueMap } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';

import { FeedbackV1 } from '../data/version1/FeedbackV1';

export interface IFeedbacksPersistence extends IGetter<FeedbackV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<FeedbackV1>>;

    getOneById(correlationId: string, id: string): Promise<FeedbackV1>;

    create(correlationId: string, item: FeedbackV1): Promise<FeedbackV1>;

    updatePartially(correlationId: string, id: string, data: AnyValueMap): Promise<FeedbackV1>;

    deleteById(correlationId: string, id: string): Promise<FeedbackV1>;
}
