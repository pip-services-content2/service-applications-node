import { Descriptor } from 'pip-services3-commons-nodex';
import { CommandableGrpcService } from 'pip-services3-grpc-nodex';

export class ApplicationsCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/applications');
        this._dependencyResolver.put('controller', new Descriptor('service-applications', 'controller', 'default', '*', '*'));
    }
}