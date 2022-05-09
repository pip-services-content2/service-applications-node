const assert = require('chai').assert;

import { FilterParams, MultiString } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { ApplicationV1 } from '../../src/data/version1/ApplicationV1';

import { IApplicationsPersistence } from '../../src/persistence/IApplicationsPersistence';

let APPLICATION1: ApplicationV1 = {
    id: '1',
    name: new MultiString({en: 'App1'}),
    product: 'Product 1',
    copyrights: 'PipDevs 2018',
    min_ver: 0,
    max_ver: 9999
};
let APPLICATION2: ApplicationV1 = {
    id: '2',
    name: new MultiString({en: 'App2'}),
    product: 'Product 1',
    copyrights: 'PipDevs 2018',
    min_ver: 0,
    max_ver: 9999
};
let APPLICATION3: ApplicationV1 = {
    id: '3',
    name: new MultiString({en: 'App3'}),
    product: 'Product 2',
    copyrights: 'PipDevs 2008',
    min_ver: 0,
    max_ver: 9999
};

export class ApplicationsPersistenceFixture {
    private _persistence: IApplicationsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private async testCreateApplications() {
        // Create one application
        let application = await this._persistence.create(null, APPLICATION1);

        assert.isObject(application);
        assert.equal(application.name.get('en'), APPLICATION1.name.get('en'));
        assert.equal(application.product, APPLICATION1.product);
        assert.equal(application.copyrights, APPLICATION1.copyrights);

        // Create another application
        application = await this._persistence.create(null, APPLICATION2);
        
        assert.isObject(application);
        assert.equal(application.name.get('en'), APPLICATION2.name.get('en'));
        assert.equal(application.product, APPLICATION2.product);
        assert.equal(application.copyrights, APPLICATION2.copyrights);

        // Create yet another application
        application = await this._persistence.create(null, APPLICATION3);

        assert.isObject(application);
        assert.equal(application.name.get('en'), APPLICATION3.name.get('en'));
        assert.equal(application.product, APPLICATION3.product);
        assert.equal(application.copyrights, APPLICATION3.copyrights);
    }
                
    public async testCrudOperations() {
        let application1: ApplicationV1;

        // Create items
        await this.testCreateApplications();

        // Get all applications
        let page = await this._persistence.getPageByFilter(
            null,
            new FilterParams(),
            new PagingParams()
        );
        
        assert.isObject(page);
        assert.lengthOf(page.data, 3);

        application1 = page.data[0];

        // Update the application
        //application1.name.put('en', 'Updated Name 1');
        application1.name = new MultiString({ en: 'Updated Name 1' });

        let application = await this._persistence.update(null, application1);

        assert.isObject(application);
        // assert.equal(application.name.get('en'), 'Updated Name 1');
        assert.equal(application.id, application1.id);

        // Delete application
        await this._persistence.deleteById(null, application1.id);

        // Try to get delete application
        application = await this._persistence.getOneById(null, application1.id);

        assert.isNull(application || null);
    }

    public async testGetWithFilter() {
        // Create applications
        await this.testCreateApplications();

        // Get applications filtered by product
        let applications = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                product: 'Product 1'
            }),
            new PagingParams()
        );

        assert.isObject(applications);
        assert.lengthOf(applications.data, 2);

        // Get applications filtered by search
        applications = await this._persistence.getPageByFilter(
            null,
            FilterParams.fromValue({
                search: '1'
            }),
            new PagingParams()
        );

        assert.isObject(applications);
        assert.lengthOf(applications.data, 2);
    }

}
