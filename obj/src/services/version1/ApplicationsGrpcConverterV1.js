"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsGrpcConverterV1 = void 0;
const messages = require('../../../../src/protos/applications_v1_pb');
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
class ApplicationsGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_nodex_3.ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();
        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        ApplicationsGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);
        return obj;
    }
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: ApplicationsGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_nodex_4.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (typeof values.toObject == 'function')
            values = values.toObject();
        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (typeof map.set == 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        ApplicationsGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromPagingParams(paging) {
        if (paging == null)
            return null;
        let obj = new messages.PagingParams();
        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);
        return obj;
    }
    static toPagingParams(obj) {
        if (obj == null)
            return null;
        let paging = new pip_services3_commons_nodex_2.PagingParams(obj.getSkip(), obj.getTake(), obj.getTotal());
        return paging;
    }
    static fromApplication(application) {
        if (application == null)
            return null;
        let obj = new messages.Application();
        obj.setId(application.id);
        ApplicationsGrpcConverterV1.setMap(obj.getNameMap(), application.name);
        ApplicationsGrpcConverterV1.setMap(obj.getDescriptionMap(), application.description);
        obj.setProduct(application.product);
        obj.setGroup(application.group);
        obj.setCopyrights(application.copyrights);
        obj.setUrl(application.url);
        obj.setIcon(application.icon);
        obj.setMinVer(application.min_ver);
        obj.setMaxVer(application.max_ver);
        obj.setAccessRightsList(application.access_rights);
        return obj;
    }
    static toApplication(obj) {
        if (obj == null)
            return null;
        let application = {
            id: obj.getId(),
            name: new pip_services3_commons_nodex_1.MultiString(),
            description: new pip_services3_commons_nodex_1.MultiString(),
            product: obj.getProduct(),
            group: obj.getGroup(),
            copyrights: obj.getCopyrights(),
            url: obj.getUrl(),
            icon: obj.getIcon(),
            min_ver: obj.getMinVer(),
            max_ver: obj.getMaxVer(),
            access_rights: obj.getAccessRightsList()
        };
        ApplicationsGrpcConverterV1.setMap(application.name, obj.getNameMap());
        ApplicationsGrpcConverterV1.setMap(application.description, obj.getDescriptionMap());
        return application;
    }
    static fromApplicationPage(page) {
        if (page == null)
            return null;
        let obj = new messages.ApplicationPage();
        obj.setTotal(page.total);
        let data = page.data.map(ApplicationsGrpcConverterV1.fromApplication);
        obj.setDataList(data);
        return obj;
    }
    static toApplicationPage(obj) {
        if (obj == null)
            return null;
        let data = obj.getDataList().map(ApplicationsGrpcConverterV1.toApplication);
        let page = {
            total: obj.getTotal(),
            data: data
        };
        return page;
    }
}
exports.ApplicationsGrpcConverterV1 = ApplicationsGrpcConverterV1;
//# sourceMappingURL=ApplicationsGrpcConverterV1.js.map