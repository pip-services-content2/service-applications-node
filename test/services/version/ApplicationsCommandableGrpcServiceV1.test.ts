const assert = require('chai').assert;
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

import { Descriptor } from 'pip-services3-commons-nodex';
import { ConfigParams } from 'pip-services3-commons-nodex';
import { MultiString } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { ApplicationV1 } from '../../../src/data/version1/ApplicationV1';
import { ApplicationsMemoryPersistence } from '../../../src/persistence/ApplicationsMemoryPersistence';
import { ApplicationsController } from '../../../src/logic/ApplicationsController';
import { ApplicationsCommandableGrpcServiceV1 } from '../../../src/services/version1/ApplicationsCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
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

suite('ApplicationsCommandableGrpcServiceV1', ()=> {
    let service: ApplicationsCommandableGrpcServiceV1;

    let client: any;

    suiteSetup(async () => {
        let persistence = new ApplicationsMemoryPersistence();
        let controller = new ApplicationsController();

        service = new ApplicationsCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('service-applications', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-applications', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-applications', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        await service.open(null);
    });
    
    suiteTeardown(async () => {
        await service.close(null);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-nodex/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('CRUD Operations', async () => {
        let application1, application2;

        // Create one application
        let response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/applications.create_application',
                    args_empty: false,
                    args_json: JSON.stringify({
                        application: APPLICATION1
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let application = JSON.parse(response.result_json);

        assert.isObject(application);
        assert.equal(application.name.en, APPLICATION1.name.get('en'));
        assert.equal(application.product, APPLICATION1.product);
        assert.equal(application.copyrights, APPLICATION1.copyrights);

        application1 = application;

        // Create another application
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/applications.create_application',
                    args_empty: false,
                    args_json: JSON.stringify({
                        application: APPLICATION2
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        application = JSON.parse(response.result_json);

        assert.isObject(application);
        assert.equal(application.name.en, APPLICATION2.name.get('en'));
        assert.equal(application.product, APPLICATION2.product);
        assert.equal(application.copyrights, APPLICATION2.copyrights);

        application2 = application;

        // Get all applications
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/applications.get_applications',
                    args_empty: false,
                    args_json: JSON.stringify({})
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        let page = JSON.parse(response.result_json);

        assert.isObject(page);
        assert.lengthOf(page.data, 2);

        // Update the application
        application1.name.en = 'Updated Name 1';

        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/applications.update_application',
                    args_empty: false,
                    args_json: JSON.stringify({
                        application: application1
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        application = JSON.parse(response.result_json);

        assert.isObject(application);
        assert.equal(application.name.en, 'Updated Name 1');
        assert.equal(application.id, APPLICATION1.id);

        application1 = application;

        // Delete application
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/applications.delete_application_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        application_id: application1.id
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isFalse(response.result_empty);
        assert.isString(response.result_json);
        application = JSON.parse(response.result_json);

        // assert.isNull(result);

        // Try to get delete application
        response = await new Promise<any>((resolve, reject) => {
            client.invoke(
                {
                    method: 'v1/applications.get_application_by_id',
                    args_empty: false,
                    args_json: JSON.stringify({
                        application_id: application1.id
                    })
                },
                (err, response) => {
                    if (err != null) reject(err);
                    else resolve(response);
                }
            );
        });

        assert.isTrue(response.result_empty);

        // assert.isNull(result);
    });
});
