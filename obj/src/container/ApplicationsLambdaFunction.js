"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.ApplicationsLambdaFunction = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_aws_nodex_1 = require("pip-services3-aws-nodex");
const ApplicationsServiceFactory_1 = require("../build/ApplicationsServiceFactory");
class ApplicationsLambdaFunction extends pip_services3_aws_nodex_1.CommandableLambdaFunction {
    constructor() {
        super("applications", "Applications function");
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-applications', 'controller', 'default', '*', '*'));
        this._factories.add(new ApplicationsServiceFactory_1.ApplicationsServiceFactory());
    }
}
exports.ApplicationsLambdaFunction = ApplicationsLambdaFunction;
exports.handler = new ApplicationsLambdaFunction().getHandler();
//# sourceMappingURL=ApplicationsLambdaFunction.js.map