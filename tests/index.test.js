console.log('Start tests')

require('./batida.test').runTests();
require('./folha.test').runTests();
require('../bin/www').stopServer();