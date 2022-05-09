"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_5 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_6 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_7 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_8 = require("pip-services3-commons-nodex");
const ApplicationV1Schema_1 = require("../data/version1/ApplicationV1Schema");
class ApplicationsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetApplicationsCommand());
        this.addCommand(this.makeGetApplicationByIdCommand());
        this.addCommand(this.makeCreateApplicationCommand());
        this.addCommand(this.makeUpdateApplicationCommand());
        this.addCommand(this.makeDeleteApplicationByIdCommand());
    }
    makeGetApplicationsCommand() {
        return new pip_services3_commons_nodex_2.Command("get_applications", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_nodex_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_nodex_8.PagingParamsSchema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let filter = pip_services3_commons_nodex_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_nodex_4.PagingParams.fromValue(args.get("paging"));
            return yield this._logic.getApplications(correlationId, filter, paging);
        }));
    }
    makeGetApplicationByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("get_application_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('application_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let application_id = args.getAsString("application_id");
            return yield this._logic.getApplicationById(correlationId, application_id);
        }));
    }
    makeCreateApplicationCommand() {
        return new pip_services3_commons_nodex_2.Command("create_application", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('application', new ApplicationV1Schema_1.ApplicationV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let application = args.get("application");
            return yield this._logic.createApplication(correlationId, application);
        }));
    }
    makeUpdateApplicationCommand() {
        return new pip_services3_commons_nodex_2.Command("update_application", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('application', new ApplicationV1Schema_1.ApplicationV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let application = args.get("application");
            return yield this._logic.updateApplication(correlationId, application);
        }));
    }
    makeDeleteApplicationByIdCommand() {
        return new pip_services3_commons_nodex_2.Command("delete_application_by_id", new pip_services3_commons_nodex_5.ObjectSchema(true)
            .withRequiredProperty('application_id', pip_services3_commons_nodex_6.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let applicationId = args.getAsNullableString("application_id");
            return yield this._logic.deleteApplicationById(correlationId, applicationId);
        }));
    }
}
exports.ApplicationsCommandSet = ApplicationsCommandSet;
//# sourceMappingURL=ApplicationsCommandSet.js.map