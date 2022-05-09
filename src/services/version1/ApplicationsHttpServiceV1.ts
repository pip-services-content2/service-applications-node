import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableHttpService } from 'pip-services3-rpc-nodex';

export class ApplicationsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/applications');
        this._dependencyResolver.put('controller', new Descriptor('service-applications', 'controller', 'default', '*', '1.0'));
    }
}