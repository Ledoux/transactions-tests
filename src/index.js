export const TEST_MONGO_URL = 'mongodb://localhost/transactionx-express-test'
export const FIRST_TEST_COLLECTION_NAME = 'foos'
export const SECOND_TEST_COLLECTION_NAME = 'faas'
export const TEST_PORT = 5000
export const TEST_EXPRESS_URL = `http://0.0.0.0:${TEST_PORT}`
export const TEST_PATH = '/api'
export const FIRST_TEST_API_URL = `${TEST_EXPRESS_URL}${TEST_PATH}/${FIRST_TEST_COLLECTION_NAME}`
export const SECOND_TEST_API_URL = `${TEST_EXPRESS_URL}${TEST_PATH}/${SECOND_TEST_COLLECTION_NAME}`

export const postedFirstTestDocuments = [
  { number: 1, txt: 'hello', 'things': [0],
    myFaaId: '58d2a5818975fd0893fc8b6e', yourFaaId: '58d2a5818975fd0893fc8b6c' },
  { number: 35, txt: 'bonjour!', 'things': [] },
  { number: 43, txt: 'yo nigger', 'things': [] },
  { number: 1, txt: 'hello bis', 'things': [3],
    faaId: '58d2a5818975fd0893fc8b6b',
    theFaaIds: ['58d2a5818975fd0893fc8b6b', '58d2a5818975fd0893fc8b6e'] },
  { number: 43, txt: 'yo nigger bis', 'things': [1] }
]

export const postedSecondTestDocuments = [
  { id: '58d2a5818975fd0893fc8b6e', txt: 'molky is fun. A lot.' },
  { id: '58d2a5818975fd0893fc8b6b', txt: 'Karl Marx Landers' },
  { id: '58d2a5818975fd0893fc8b6c', txt: 'Too packed for life' }
]
export const gotTestQuery = { number: 1 }
export const putTestQuery = { number: 1 }
export const putTestUpdate = {$set: {txt: 'Guten Tag'}}

export const deletedTestQuery = { number: 43 }

export const postedTestDeepEquals = ['hello']
export const gotTestDeepEquals = ['hello', 'molky is fun. A lot.', 'Karl Marx Landers']
export const putTestDeepEquals = ['Guten Tag']
export const deletedTestDeepEquals = [2]
export const allTestDeepEquals = [].concat(
  postedTestDeepEquals,
  gotTestDeepEquals,
  putTestDeepEquals,
  deletedTestDeepEquals
)

export const JOIN_FIRST_TEST_API_URL = `${FIRST_TEST_API_URL}?${encodeQuery(gotTestQuery)}`
