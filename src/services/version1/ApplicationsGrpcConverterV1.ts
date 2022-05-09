const messages = require('../../../../src/protos/applications_v1_pb');

import { DataPage, MultiString } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';
import { ErrorDescriptionFactory } from 'pip-services3-commons-nodex';
import { ErrorDescription } from 'pip-services3-commons-nodex';
import { ApplicationExceptionFactory } from 'pip-services3-commons-nodex';

import { ApplicationV1 } from '../../data/version1/ApplicationV1';

export class ApplicationsGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
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

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: ApplicationsGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (typeof values.toObject == 'function')
            values = values.toObject();

        if (Array.isArray(values)) {
            for (let entry of values) {
                if (Array.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (typeof map.set == 'function') {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        ApplicationsGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromPagingParams(paging: PagingParams): any {
        if (paging == null) return null;

        let obj = new messages.PagingParams();

        obj.setSkip(paging.skip);
        obj.setTake(paging.take);
        obj.setTotal(paging.total);

        return obj;
    }

    public static toPagingParams(obj: any): PagingParams {
        if (obj == null)
            return null;

        let paging: PagingParams = new PagingParams(
            obj.getSkip(),
            obj.getTake(),
            obj.getTotal()
        );

        return paging;
    }

    public static fromApplication(application: ApplicationV1): any {
        if (application == null) return null;

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

    public static toApplication(obj: any): ApplicationV1 {
        if (obj == null) return null;

        let application: ApplicationV1 = {
            id: obj.getId(),
            name: new MultiString(),
            description: new MultiString(),
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

    public static fromApplicationPage(page: DataPage<ApplicationV1>): any {
        if (page == null) return null;

        let obj = new messages.ApplicationPage();

        obj.setTotal(page.total);
        let data = page.data.map(ApplicationsGrpcConverterV1.fromApplication);
        obj.setDataList(data);

        return obj;
    }

    public static toApplicationPage(obj: any): DataPage<ApplicationV1> {
        if (obj == null) return null;

        let data = obj.getDataList().map(ApplicationsGrpcConverterV1.toApplication);
        let page: DataPage<ApplicationV1> = {
            total: obj.getTotal(),
            data: data
        };

        return page;
    }

}