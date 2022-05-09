"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
class ApplicationV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services3_commons_nodex_3.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_nodex_3.TypeCode.Map);
        this.withOptionalProperty('description', pip_services3_commons_nodex_3.TypeCode.Map);
        this.withRequiredProperty('product', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('group', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('copyrights', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('url', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('icon', pip_services3_commons_nodex_3.TypeCode.String);
        this.withOptionalProperty('min_ver', pip_services3_commons_nodex_3.TypeCode.Integer);
        this.withOptionalProperty('max_ver', pip_services3_commons_nodex_3.TypeCode.Integer);
        this.withOptionalProperty('access_rights', new pip_services3_commons_nodex_2.ArraySchema(pip_services3_commons_nodex_3.TypeCode.String));
    }
}
exports.ApplicationV1Schema = ApplicationV1Schema;
//# sourceMappingURL=ApplicationV1Schema.js.map