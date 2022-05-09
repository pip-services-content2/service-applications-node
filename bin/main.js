let ApplicationsProcess = require('../obj/src/container/ApplicationsProcess').ApplicationsProcess;

try {
    new ApplicationsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
