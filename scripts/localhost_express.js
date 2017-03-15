require('babel-polyfill')

const { JOIN_FIRST_TEST_API_URL, runQuickTransactionxExpressServer } = require('../lib/tests')

runQuickTransactionxServer()
  .then(() => {
    console.log(`test the api here ${JOIN_FIRST_TEST_API_URL}`)
  })
