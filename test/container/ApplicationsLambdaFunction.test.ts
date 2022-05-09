const assert = require('chai').assert;

import { MultiString } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';

import { ApplicationV1 } from '../../src/data/version1/ApplicationV1';
import { ApplicationsLambdaFunction } from '../../src/container/ApplicationsLambdaFunction';

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

suite('ApplicationsLambdaFunction', ()=> {
    let lambda: ApplicationsLambdaFunction;

    suiteSetup(async () => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'service-applications:persistence:memory:default:1.0',
            'controller.descriptor', 'service-applications:controller:default:default:1.0'
        );

        lambda = new ApplicationsLambdaFunction();
        lambda.configure(config);
        await lambda.open(null);
    });
    
    suiteTeardown(async () => {
        await lambda.close(null);
    });
    
    test('CRUD Operations', async () => {
        var application1, application2: ApplicationV1;

        // Create one application
        let application = await lambda.act(
            {
                role: 'applications',
                cmd: 'create_application',
                application: APPLICATION1
            }
        );

        assert.isObject(application);
        assert.equal(application.name, APPLICATION1.name);
        assert.equal(application.product, APPLICATION1.product);
        assert.equal(application.copyrights, APPLICATION1.copyrights);

        application1 = application;

        // Create another application
        application = await lambda.act(
            {
                role: 'applications',
                cmd: 'create_application',
                application: APPLICATION2
            }
        );

        assert.isObject(application);
        assert.equal(application.name, APPLICATION2.name);
        assert.equal(application.product, APPLICATION2.product);
        assert.equal(application.copyrights, APPLICATION2.copyrights);

        application2 = application;

        // Get all applications
        let page = await lambda.act(
            {
                role: 'applications',
                cmd: 'get_applications'
            }
        );

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the application
        application1.name.en = 'Updated Name 1';

        application = await lambda.act(
            {
                role: 'applications',
                cmd: 'update_application',
                application: application1
            }
        );

        assert.isObject(application);
        assert.equal(application.name.en, 'Updated Name 1');
        assert.equal(application.id, APPLICATION1.id);

        application1 = application;

        // Delete application
        await lambda.act(
            {
                role: 'applications',
                cmd: 'delete_application_by_id',
                application_id: application1.id
            }
        );

        // Try to get delete application
        application = await lambda.act(
            {
                role: 'applications',
                cmd: 'get_application_by_id',
                application_id: application1.id
            }
        );

        assert.isNull(application || null);
    });
});