const restify = require('restify');
const assert = require('chai').assert;

import { ConfigParams, MultiString } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { ApplicationV1 } from '../../../src/data/version1/ApplicationV1';
import { ApplicationsMemoryPersistence } from '../../../src/persistence/ApplicationsMemoryPersistence';
import { ApplicationsController } from '../../../src/logic/ApplicationsController';
import { ApplicationsHttpServiceV1 } from '../../../src/services/version1/ApplicationsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

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
    name: new MultiString({en: 'App1'}),
    product: 'Product 1',
    copyrights: 'PipDevs 2018',
    min_ver: 0,
    max_ver: 9999
};

suite('ApplicationsHttpServiceV1', ()=> {    
    let service: ApplicationsHttpServiceV1;
    let rest: any;

    suiteSetup(async () => {
        let persistence = new ApplicationsMemoryPersistence();
        let controller = new ApplicationsController();

        service = new ApplicationsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-applications', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-applications', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-applications', 'service', 'http', 'default', '1.0'), service
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
        let application1, application2;

        // Create one application
        let application = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/applications/create_application',
                {
                    application: APPLICATION1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(application);
        assert.equal(application.name.en, APPLICATION1.name.get('en'));
        assert.equal(application.product, APPLICATION1.product);
        assert.equal(application.copyrights, APPLICATION1.copyrights);

        application1 = application;

        // Create another application
        application = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/applications/create_application',
                {
                    application: APPLICATION2
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(application);
        assert.equal(application.name.en, APPLICATION2.name.get('en'));
        assert.equal(application.product, APPLICATION2.product);
        assert.equal(application.copyrights, APPLICATION2.copyrights);

        application2 = application;

        // Get all applications
        let page = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/applications/get_applications',
                {},
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the application
        application1.name.en = 'Updated Name 1';

        application = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/applications/update_application',
                {
                    application: application1
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        assert.isObject(application);
        assert.equal(application.name.en, 'Updated Name 1');
        assert.equal(application.id, APPLICATION1.id);

        application1 = application;

        // Delete application
        let result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/applications/delete_application_by_id',
                {
                    application_id: application1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);

        // Try to get delete application
        result = await new Promise<any>((resolve, reject) => {
            rest.post('/v1/applications/delete_application_by_id',
                {
                    application_id: application1.id
                },
                (err, req, res, result) => {
                    if (err == null) resolve(result);
                    else reject(err);
                }
            );
        });

        // assert.isNull(result);
    });
});