import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { IdentifiableMongoDbPersistence } from 'pip-services3-mongodb-nodex';

import { ApplicationV1 } from '../data/version1/ApplicationV1';
import { IApplicationsPersistence } from './IApplicationsPersistence';

export class ApplicationsMongoDbPersistence
    extends IdentifiableMongoDbPersistence<ApplicationV1, string>
    implements IApplicationsPersistence {

    constructor() {
        super('applications');
    }
    
    private composeFilter(filter: any) {
        filter = filter || new FilterParams();

        let criteria = [];

        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ id: { $regex: searchRegex } });
            searchCriteria.push({ product: { $regex: searchRegex } });
            searchCriteria.push({ copyrights: { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }

        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });

        let product = filter.getAsNullableString('product');
        if (product != null)
            criteria.push({ product: product });

        let group = filter.getAsNullableString('group');
        if (group != null)
            criteria.push({ group: group });
                
        return criteria.length > 0 ? { $and: criteria } : null;
    }
    
    public async getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ApplicationV1>> {
        return await super.getPageByFilter(correlationId, this.composeFilter(filter), paging, null, null);
    }

}
