import { CommandSet } from 'pip-services3-commons-nodex';
import { IApplicationsController } from './IApplicationsController';
export declare class ApplicationsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IApplicationsController);
    private makeGetApplicationsCommand;
    private makeGetApplicationByIdCommand;
    private makeCreateApplicationCommand;
    private makeUpdateApplicationCommand;
    private makeDeleteApplicationByIdCommand;
}
