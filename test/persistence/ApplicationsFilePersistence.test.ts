import { ApplicationsFilePersistence } from '../../src/persistence/ApplicationsFilePersistence';
import { ApplicationsPersistenceFixture } from './ApplicationsPersistenceFixture';

suite('ApplicationsFilePersistence', ()=> {
    let persistence: ApplicationsFilePersistence;
    let fixture: ApplicationsPersistenceFixture;
    
    setup(async () => {
        persistence = new ApplicationsFilePersistence('./data/applications.test.json');

        fixture = new ApplicationsPersistenceFixture(persistence);

        await persistence.open(null);
        await persistence.clear(null);
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