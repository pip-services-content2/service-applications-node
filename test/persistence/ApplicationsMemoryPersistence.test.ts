import { ConfigParams } from 'pip-services3-commons-nodex';

import { ApplicationsMemoryPersistence } from '../../src/persistence/ApplicationsMemoryPersistence';
import { ApplicationsPersistenceFixture } from './ApplicationsPersistenceFixture';

suite('ApplicationsMemoryPersistence', ()=> {
    let persistence: ApplicationsMemoryPersistence;
    let fixture: ApplicationsPersistenceFixture;
    
    setup(async () => {
        persistence = new ApplicationsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new ApplicationsPersistenceFixture(persistence);
        
        await persistence.open(null);
    });
    
    teardown(async () => {
        await persistence.close(null);
    });
        
    test('CRUD Operations', async () => {
        await fixture.testCrudOperations();
    });

    test('Get with Filters', async () => {
        await fixture.testGetWithFilter();
    });

});