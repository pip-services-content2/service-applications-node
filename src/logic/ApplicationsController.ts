import { ConfigParams } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { DependencyResolver } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { DataPage } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';

import { ApplicationV1 } from '../data/version1/ApplicationV1';
import { IApplicationsPersistence } from '../persistence/IApplicationsPersistence';
import { IApplicationsController } from './IApplicationsController';
import { ApplicationsCommandSet } from './ApplicationsCommandSet';

export class ApplicationsController implements  IConfigurable, IReferenceable, ICommandable, IApplicationsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'service-applications:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(ApplicationsController._defaultConfig);
    private _persistence: IApplicationsPersistence;
    private _commandSet: ApplicationsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IApplicationsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new ApplicationsCommandSet(this);
        return this._commandSet;
    }
    
    public async getApplications(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<ApplicationV1>> {
        return await this._persistence.getPageByFilter(correlationId, filter, paging);
    }

    public async getApplicationById(correlationId: string, id: string): Promise<ApplicationV1> {
        return await this._persistence.getOneById(correlationId, id);        
    }

    public async createApplication(correlationId: string, application: ApplicationV1): Promise<ApplicationV1> {
        return await this._persistence.create(correlationId, application);
    }

    public async updateApplication(correlationId: string, application: ApplicationV1): Promise<ApplicationV1> {
        return await this._persistence.update(correlationId, application);
    }

    public async deleteApplicationById(correlationId: string, id: string): Promise<ApplicationV1> {  
        return await this._persistence.deleteById(correlationId, id);
    }

}
