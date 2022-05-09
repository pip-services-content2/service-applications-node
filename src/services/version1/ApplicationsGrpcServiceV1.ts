const services = require('../../../../src/protos/applications_v1_grpc_pb');
const messages = require('../../../../src/protos/applications_v1_pb');

import { IReferences } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { FilterParams } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';

import { ApplicationV1 } from '../../data/version1/ApplicationV1';
import { ApplicationV1Schema } from '../../data/version1/ApplicationV1Schema';
import { IApplicationsController } from '../../logic/IApplicationsController';
import { ApplicationsGrpcConverterV1 } from './ApplicationsGrpcConverterV1';

export class ApplicationsGrpcServiceV1 extends GrpcService {
    private _controller: IApplicationsController;
	
    public constructor() {
        super(services.ApplicationsService);
        this._dependencyResolver.put('controller', new Descriptor("service-applications", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IApplicationsController>('controller');
    }
    
    private async getApplications(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let filter = new FilterParams();
        ApplicationsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
        let paging = ApplicationsGrpcConverterV1.toPagingParams(call.request.getPaging());

        let response = new messages.ApplicationPageReply();

        try {
            let result = await this._controller.getApplications(correlationId, filter, paging);
            let page = ApplicationsGrpcConverterV1.fromApplicationPage(result);
            response.setPage(page);
        } catch(err) {
            let error = ApplicationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async getApplicationById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let applicationId = call.request.getApplicationId();

        let response = new messages.ApplicationObjectReply();
        
        try {
            let result = await this._controller.getApplicationById(correlationId, applicationId);
            let application = ApplicationsGrpcConverterV1.fromApplication(result);
            response.setApplication(application);
        } catch (err) {
            let error = ApplicationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async createApplication(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let application = ApplicationsGrpcConverterV1.toApplication(call.request.getApplication());
        
        let response = new messages.ApplicationObjectReply();

        try {
            let result = await this._controller.createApplication(correlationId, application);
            let applicationGrpc = ApplicationsGrpcConverterV1.fromApplication(result);
            if (result)
                response.setApplication(applicationGrpc);
        } catch(err){
            let error = ApplicationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async updateApplication(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let application = ApplicationsGrpcConverterV1.toApplication(call.request.getApplication());
        
        let response = new messages.ApplicationObjectReply();

        try {
            let result = await this._controller.updateApplication(correlationId, application);
            let applicationGrpc = ApplicationsGrpcConverterV1.fromApplication(result);
            if (result)
                response.setApplication(applicationGrpc);
        } catch(err) {
            let error = ApplicationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }

    private async deleteApplicationById(call: any): Promise<any> {
        let correlationId = call.request.getCorrelationId();
        let applicationId = call.request.getApplicationId();

        let response = new messages.ApplicationObjectReply();

        try {
            let result = await this._controller.deleteApplicationById(correlationId, applicationId);
            let applicationGrpc = ApplicationsGrpcConverterV1.fromApplication(result);
            if (result)
                response.setApplication(applicationGrpc);
        } catch(err) {
            let error = ApplicationsGrpcConverterV1.fromError(err);
            response.setError(error);
        }

        return response;
    }    
        
    public register() {
        this.registerMethod(
            'get_applications', 
            null,
            this.getApplications
        );

        this.registerMethod(
            'get_application_by_id', 
            null,
            this.getApplicationById
        );

        this.registerMethod(
            'create_application', 
            null,
            this.createApplication
        );

        this.registerMethod(
            'update_application', 
            null,
            this.updateApplication
        );

        this.registerMethod(
            'delete_application_by_id',
            null, 
            this.deleteApplicationById
        );
    }
}
