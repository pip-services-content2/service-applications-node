import { IReferences } from 'pip-services3-commons-nodex';
import { GrpcService } from 'pip-services3-grpc-nodex';
export declare class ApplicationsGrpcServiceV1 extends GrpcService {
    private _controller;
    constructor();
    setReferences(references: IReferences): void;
    private getApplications;
    private getApplicationById;
    private createApplication;
    private updateApplication;
    private deleteApplicationById;
    register(): void;
}
