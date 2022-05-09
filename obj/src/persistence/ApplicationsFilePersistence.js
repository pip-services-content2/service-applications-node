"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsFilePersistence = void 0;
const pip_services3_data_nodex_1 = require("pip-services3-data-nodex");
const ApplicationsMemoryPersistence_1 = require("./ApplicationsMemoryPersistence");
class ApplicationsFilePersistence extends ApplicationsMemoryPersistence_1.ApplicationsMemoryPersistence {
    constructor(path) {
        super();
        this._persister = new pip_services3_data_nodex_1.JsonFilePersister(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }
    configure(config) {
        super.configure(config);
        this._persister.configure(config);
    }
}
exports.ApplicationsFilePersistence = ApplicationsFilePersistence;
//# sourceMappingURL=ApplicationsFilePersistence.js.map