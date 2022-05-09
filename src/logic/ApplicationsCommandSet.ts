import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommand } from 'pip-services3-commons-nodex';
import { Command } from 'pip-services3-commons-nodex';
import { Parameters } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';
import { FilterParamsSchema } from 'pip-services3-commons-nodex';
import { PagingParamsSchema } from 'pip-services3-commons-nodex';

import { ApplicationV1Schema } from '../data/version1/ApplicationV1Schema';
import { IApplicationsController } from './IApplicationsController';

export class ApplicationsCommandSet extends CommandSet {
    private _logic: IApplicationsController;

    constructor(logic: IApplicationsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetApplicationsCommand());
		this.addCommand(this.makeGetApplicationByIdCommand());
		this.addCommand(this.makeCreateApplicationCommand());
		this.addCommand(this.makeUpdateApplicationCommand());
		this.addCommand(this.makeDeleteApplicationByIdCommand());
    }

	private makeGetApplicationsCommand(): ICommand {
		return new Command(
			"get_applications",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            async (correlationId: string, args: Parameters) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                return await this._logic.getApplications(correlationId, filter, paging);
            }
		);
	}

	private makeGetApplicationByIdCommand(): ICommand {
		return new Command(
			"get_application_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('application_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let application_id = args.getAsString("application_id");
				return await this._logic.getApplicationById(correlationId, application_id);
            }
		);
	}

	private makeCreateApplicationCommand(): ICommand {
		return new Command(
			"create_application",
			new ObjectSchema(true)
				.withRequiredProperty('application', new ApplicationV1Schema()),
			async (correlationId: string, args: Parameters) => {
                let application = args.get("application");
				return await this._logic.createApplication(correlationId, application);
            }
		);
	}

	private makeUpdateApplicationCommand(): ICommand {
		return new Command(
			"update_application",
			new ObjectSchema(true)
				.withRequiredProperty('application', new ApplicationV1Schema()),
			async (correlationId: string, args: Parameters) => {
                let application = args.get("application");
				return await this._logic.updateApplication(correlationId, application);
            }
		);
	}
	
	private makeDeleteApplicationByIdCommand(): ICommand {
		return new Command(
			"delete_application_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('application_id', TypeCode.String),
			async (correlationId: string, args: Parameters) => {
                let applicationId = args.getAsNullableString("application_id");
				return await this._logic.deleteApplicationById(correlationId, applicationId);
			}
		);
	}

}