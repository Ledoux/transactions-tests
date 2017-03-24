export const TEST_MONGO_URL = 'mongodb://localhost/transactionx-express-test'
export const FIRST_TEST_COLLECTION_NAME = 'foos'
export const SECOND_TEST_COLLECTION_NAME = 'faas'
export const TEST_PORT = 5000
export const TEST_EXPRESS_URL = `http://0.0.0.0:${TEST_PORT}`
export const TEST_PATH = '/api'
export const FIRST_TEST_API_URL = `${TEST_EXPRESS_URL}${TEST_PATH}/${FIRST_TEST_COLLECTION_NAME}`
export const SECOND_TEST_API_URL = `${TEST_EXPRESS_URL}${TEST_PATH}/${SECOND_TEST_COLLECTION_NAME}`

// POST TEST
export const postedFirstTestDocuments = [
  {
    id: '58d2a5818975fd0893fc8b2a',
    // will be added during the join with the testFooId_JOIN_myFaaId
    // myFaaId: '58d2a5818975fd0893fc8b6e',
    number: 1,
    things: [0],
    txt: 'hello',
    // will be added during the join with the stupidFooId_JOIN_yourFaaId
    // yourFaaId: '58d2a5818975fd0893fc8b6c' // will be added during the join
  },
  { number: 35, txt: 'bonjour!', things: [] },
  {
    number: 43,
    txt: 'yo nigger',
    things: []
  },
  {
    faaId: '58d2a5818975fd0893fc8b6b',
    id: '58d2a5818975fd0893fc8b5a',
    number: 1,
    /*
    theFaaIds: [
      // from arrayFooId_JOIN_theFaaIds
      '58d2a5818975fd0893fc8b6b',
      // from
      '58d2a5818975fd0893fc8b6e',
      //'58d2a5818975fd0893fc8b6c'
    ], // will be added during the join
    */
    things: [3],
    txt: 'hello bis'
  },
  {
    id: '58d2a5818975fd0893fc1b5a',
    // deleteFaaId: '58d2a5818975fd0893fc8b6b' // will be added during the join
    // deleteFaaIds: '58d2a5818975fd0893fc8b6b' // will be added during the join
    number: 43,
    txt: 'yo nigger bis',
    things: [1]
  }
]

export const postedSecondTestDocuments = [
  {
    // will add myFaaId in the foos[0]
    testFooId_JOIN_myFaaId: '58d2a5818975fd0893fc8b2a',
    id: '58d2a5818975fd0893fc8b6e',
    txt: 'molky is fun. A lot.'
  },
  {
    // fooId: '58d2a5818975fd0893fc1b5a',
    // will push in foos[1] theFaaIds
    arrayFooId_JOIN_theFaaIds: '58d2a5818975fd0893fc8b5a',
    id: '58d2a5818975fd0893fc8b6b',
    txt: 'Karl Marx Landers'
  },
  {
    // fooId: '58d2a5818975fd0893fc8b5a',
    id: '58d2a5818975fd0893fc8b6c',
    // will add yourFaaId in the foos[0]
    stupidFooId_JOIN_yourFaaId: '58d2a5818975fd0893fc8b2a',
    txt: 'Too packed for life'
  }
]
export function getPostTests (firstResult, secondResult) {
  let tests = [
    firstResult.documents.find(document => document.txt === 'hello').txt,
    secondResult.join.foos.find(document => document.txt === 'hello').myFaaId,
    secondResult.join.foos.find(document => document.txt === 'hello bis').theFaaIds[0]
  ]
  return tests
}
export const postedTestDeepEquals = [
  'hello',
  '58d2a5818975fd0893fc8b6e',
  '58d2a5818975fd0893fc8b6b'
]

// GET TEST
export const gotTestQuery = { number: 1 }
export function getGetTests (result) {
  const { documents } = result
  return [
    documents[0].txt,
    documents[0].myFaa.txt,
    documents[1].theFaasById['58d2a5818975fd0893fc8b6b'].txt
  ]
}
export const gotTestDeepEquals = [
  'hello',
  'molky is fun. A lot.',
  'Karl Marx Landers'
]

// PUT TEST
export const putTestQuery = { number: 1 }
export const putTestUpdate = {$set: {
  txt: 'Guten Tag',
  // yourFaaId_JOIN_: '58d2a5818975fd0893fc8b6b'
}}
export function getPutTests (result) {
  const tests = [
    result.documents[0].txt,
    // result.join.foos[0].yourFaaId
  ]
  return tests
}
export const putTestDeepEquals = [
  'Guten Tag',
  // '58d2a5818975fd0893fc8b6b'
]

export const deletedTestQuery = {
  number: 43
}
export function getDeleteTests (result) {
  return [
    result.documents.length,
    // typeof result.join.faas[0].deleteFaaId,
    // typeof result.join.faas[0].deleteFaaIds.length
  ]
}
export const deletedTestDeepEquals = [
  2,
  // 'undefined',
  // 0
]

// GET MERGED TEST
export function getMergedGotTests (result) {
  const { documents } = result
  return [
    documents[0].myFaaId, documents[0].yourFaaId,
    documents[1].faaId, documents[1].theFaaIds
  ]
}
export const getMergedTestDeepEquals = [
  '58d2a5818975fd0893fc8b6e', '58d2a5818975fd0893fc8b6c',
  '58d2a5818975fd0893fc8b6b', ['58d2a5818975fd0893fc8b6b', '58d2a5818975fd0893fc8b6e']
]

// ALL
export const allTestDeepEquals = [].concat(
  postedTestDeepEquals,
  gotTestDeepEquals,
  putTestDeepEquals,
  deletedTestDeepEquals
)
export const allMergedTestDeepEquals = [].concat(
  postedTestDeepEquals,
  getMergedTestDeepEquals,
  putTestDeepEquals,
  deletedTestDeepEquals
)
