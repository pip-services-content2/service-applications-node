let ApplicationsLambdaFunction = require('../obj/src/container/ApplicationsLambdaFunction').ApplicationsLambdaFunction;

module.exports = new ApplicationsLambdaFunction().getHandler();