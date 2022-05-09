import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IGetter } from 'pip-services3-data-nodex';
import { IWriter } from 'pip-services3-data-nodex';
import { ApplicationV1 } from '../data/version1/ApplicationV1';
export interface IApplicationsPersistence extends IGetter<ApplicationV1, string>, IWriter<ApplicationV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ApplicationV1>>;
    getOneById(correlationId: string, id: string): Promise<ApplicationV1>;
    create(correlationId: string, item: ApplicationV1): Promise<ApplicationV1>;
    update(correlationId: string, item: ApplicationV1): Promise<ApplicationV1>;
    deleteById(correlationId: string, id: string): Promise<ApplicationV1>;
}
