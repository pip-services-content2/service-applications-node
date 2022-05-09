"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsCommandableGrpcServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_grpc_nodex_1 = require("pip-services3-grpc-nodex");
class ApplicationsCommandableGrpcServiceV1 extends pip_services3_grpc_nodex_1.CommandableGrpcService {
    constructor() {
        super('v1/applications');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-applications', 'controller', 'default', '*', '*'));
    }
}
exports.ApplicationsCommandableGrpcServiceV1 = ApplicationsCommandableGrpcServiceV1;
//# sourceMappingURL=ApplicationsCommandableGrpcServiceV1.js.map