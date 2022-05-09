"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const ApplicationsServiceFactory_1 = require("../build/ApplicationsServiceFactory");
class ApplicationsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory_1.ApplicationsServiceFactory);
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory);
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory);
        this._factories.add(new pip_services3_grpc_nodex_1.DefaultGrpcFactory);
    }
}
exports.ApplicationsProcess = ApplicationsProcess;
//# sourceMappingURL=ApplicationsProcess.js.map