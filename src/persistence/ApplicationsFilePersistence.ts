import { ConfigParams } from 'pip-services3-commons-nodex';
import { JsonFilePersister } from 'pip-services3-data-nodex';

import { ApplicationsMemoryPersistence } from './ApplicationsMemoryPersistence';
import { ApplicationV1 } from '../data/version1/ApplicationV1';

export class ApplicationsFilePersistence extends ApplicationsMemoryPersistence {
	protected _persister: JsonFilePersister<ApplicationV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<ApplicationV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}