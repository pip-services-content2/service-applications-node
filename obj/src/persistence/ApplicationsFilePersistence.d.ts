import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';
import { ApplicationsMemoryPersistence } from './ApplicationsMemoryPersistence';
import { ApplicationV1 } from '../data/version1/ApplicationV1';
export declare class ApplicationsFilePersistence extends ApplicationsMemoryPersistence {
    protected _persister: JsonFilePersister<ApplicationV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
