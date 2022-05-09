import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultGrpcFactory } from 'pip-services3-grpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { ApplicationsServiceFactory } from '../build/ApplicationsServiceFactory';


export class ApplicationsProcess extends ProcessContainer {

    public constructor() {
        super("applications", "Applications microservice");
        this._factories.add(new ApplicationsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
        this._factories.add(new DefaultSwaggerFactory);
        this._factories.add(new DefaultGrpcFactory);
    }

}
