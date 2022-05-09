import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableLambdaFunction } from 'pip-services3-aws-nodex';
import { ApplicationsServiceFactory } from '../build/ApplicationsServiceFactory';

export class ApplicationsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("applications", "Applications function");
        this._dependencyResolver.put('controller', new Descriptor('service-applications', 'controller', 'default', '*', '*'));
        this._factories.add(new ApplicationsServiceFactory());
    }
}

export const handler = new ApplicationsLambdaFunction().getHandler();