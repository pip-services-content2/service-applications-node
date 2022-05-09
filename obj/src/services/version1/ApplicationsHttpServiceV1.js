"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsHttpServiceV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class ApplicationsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/applications');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-applications', 'controller', 'default', '*', '1.0'));
    }
}
exports.ApplicationsHttpServiceV1 = ApplicationsHttpServiceV1;
//# sourceMappingURL=ApplicationsHttpServiceV1.js.map