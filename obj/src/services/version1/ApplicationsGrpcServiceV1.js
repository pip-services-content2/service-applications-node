"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsGrpcServiceV1 = void 0;
const services = require('../../../../src/protos/applications_v1_grpc_pb');
const messages = require('../../../../src/protos/applications_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const ApplicationsGrpcConverterV1_1 = require("./ApplicationsGrpcConverterV1");
class ApplicationsGrpcServiceV1 extends pip_services3_grpc_nodex_1.GrpcService {
    constructor() {
        super(services.ApplicationsService);
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor("service-applications", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    getApplications(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let filter = new pip_services3_commons_nodex_2.FilterParams();
            ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.setMap(filter, call.request.getFilterMap());
            let paging = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.toPagingParams(call.request.getPaging());
            let response = new messages.ApplicationPageReply();
            try {
                let result = yield this._controller.getApplications(correlationId, filter, paging);
                let page = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplicationPage(result);
                response.setPage(page);
            }
            catch (err) {
                let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    getApplicationById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let applicationId = call.request.getApplicationId();
            let response = new messages.ApplicationObjectReply();
            try {
                let result = yield this._controller.getApplicationById(correlationId, applicationId);
                let application = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplication(result);
                response.setApplication(application);
            }
            catch (err) {
                let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    createApplication(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let application = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.toApplication(call.request.getApplication());
            let response = new messages.ApplicationObjectReply();
            try {
                let result = yield this._controller.createApplication(correlationId, application);
                let applicationGrpc = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplication(result);
                if (result)
                    response.setApplication(applicationGrpc);
            }
            catch (err) {
                let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    updateApplication(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let application = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.toApplication(call.request.getApplication());
            let response = new messages.ApplicationObjectReply();
            try {
                let result = yield this._controller.updateApplication(correlationId, application);
                let applicationGrpc = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplication(result);
                if (result)
                    response.setApplication(applicationGrpc);
            }
            catch (err) {
                let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    deleteApplicationById(call) {
        return __awaiter(this, void 0, void 0, function* () {
            let correlationId = call.request.getCorrelationId();
            let applicationId = call.request.getApplicationId();
            let response = new messages.ApplicationObjectReply();
            try {
                let result = yield this._controller.deleteApplicationById(correlationId, applicationId);
                let applicationGrpc = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromApplication(result);
                if (result)
                    response.setApplication(applicationGrpc);
            }
            catch (err) {
                let error = ApplicationsGrpcConverterV1_1.ApplicationsGrpcConverterV1.fromError(err);
                response.setError(error);
            }
            return response;
        });
    }
    register() {
        this.registerMethod('get_applications', null, this.getApplications);
        this.registerMethod('get_application_by_id', null, this.getApplicationById);
        this.registerMethod('create_application', null, this.createApplication);
        this.registerMethod('update_application', null, this.updateApplication);
        this.registerMethod('delete_application_by_id', null, this.deleteApplicationById);
    }
}
exports.ApplicationsGrpcServiceV1 = ApplicationsGrpcServiceV1;
//# sourceMappingURL=ApplicationsGrpcServiceV1.js.map