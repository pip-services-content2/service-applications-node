"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const ApplicationsMongoDbPersistence_1 = require("../persistence/ApplicationsMongoDbPersistence");
const ApplicationsFilePersistence_1 = require("../persistence/ApplicationsFilePersistence");
const ApplicationsMemoryPersistence_1 = require("../persistence/ApplicationsMemoryPersistence");
const ApplicationsController_1 = require("../logic/ApplicationsController");
const ApplicationsHttpServiceV1_1 = require("../services/version1/ApplicationsHttpServiceV1");
const ApplicationsCommandableGrpcServiceV1_1 = require("../services/version1/ApplicationsCommandableGrpcServiceV1");
const ApplicationsGrpcServiceV1_1 = require("../services/version1/ApplicationsGrpcServiceV1");
class ApplicationsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(ApplicationsServiceFactory.MemoryPersistenceDescriptor, ApplicationsMemoryPersistence_1.ApplicationsMemoryPersistence);
        this.registerAsType(ApplicationsServiceFactory.FilePersistenceDescriptor, ApplicationsFilePersistence_1.ApplicationsFilePersistence);
        this.registerAsType(ApplicationsServiceFactory.MongoDbPersistenceDescriptor, ApplicationsMongoDbPersistence_1.ApplicationsMongoDbPersistence);
        this.registerAsType(ApplicationsServiceFactory.ControllerDescriptor, ApplicationsController_1.ApplicationsController);
        this.registerAsType(ApplicationsServiceFactory.HttpServiceDescriptor, ApplicationsHttpServiceV1_1.ApplicationsHttpServiceV1);
        this.registerAsType(ApplicationsServiceFactory.CommandableGrpcServiceDescriptor, ApplicationsCommandableGrpcServiceV1_1.ApplicationsCommandableGrpcServiceV1);
        this.registerAsType(ApplicationsServiceFactory.GrpcServiceDescriptor, ApplicationsGrpcServiceV1_1.ApplicationsGrpcServiceV1);
    }
}
exports.ApplicationsServiceFactory = ApplicationsServiceFactory;
ApplicationsServiceFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("service-applications", "factory", "default", "default", "1.0");
ApplicationsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-applications", "persistence", "memory", "*", "1.0");
ApplicationsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-applications", "persistence", "file", "*", "1.0");
ApplicationsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-applications", "persistence", "mongodb", "*", "1.0");
ApplicationsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-applications", "controller", "default", "*", "1.0");
ApplicationsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-applications", "service", "http", "*", "1.0");
ApplicationsServiceFactory.CommandableGrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-applications", "service", "commandable-grpc", "*", "1.0");
ApplicationsServiceFactory.GrpcServiceDescriptor = new pip_services3_commons_nodex_1.Descriptor("service-applications", "service", "grpc", "*", "1.0");
//# sourceMappingURL=ApplicationsServiceFactory.js.map