'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPostTests = getPostTests;
exports.getGetTests = getGetTests;
exports.getPutTests = getPutTests;
exports.getDeleteTests = getDeleteTests;
exports.getMergedGotTests = getMergedGotTests;
var TEST_MONGO_URL = exports.TEST_MONGO_URL = 'mongodb://localhost/transactionx-express-test';
var FIRST_TEST_COLLECTION_NAME = exports.FIRST_TEST_COLLECTION_NAME = 'foos';
var SECOND_TEST_COLLECTION_NAME = exports.SECOND_TEST_COLLECTION_NAME = 'faas';
var TEST_PORT = exports.TEST_PORT = 5000;
var TEST_EXPRESS_URL = exports.TEST_EXPRESS_URL = 'http://0.0.0.0:' + TEST_PORT;
var TEST_PATH = exports.TEST_PATH = '/api';
var FIRST_TEST_API_URL = exports.FIRST_TEST_API_URL = '' + TEST_EXPRESS_URL + TEST_PATH + '/' + FIRST_TEST_COLLECTION_NAME;
var SECOND_TEST_API_URL = exports.SECOND_TEST_API_URL = '' + TEST_EXPRESS_URL + TEST_PATH + '/' + SECOND_TEST_COLLECTION_NAME;

// POST TEST
var postedFirstTestDocuments = exports.postedFirstTestDocuments = [{
  id: '58d2a5818975fd0893fc8b2a',
  // will be added during the join with the testFooId_JOIN_myFaaId
  // myFaaId: '58d2a5818975fd0893fc8b6e',
  number: 1,
  things: [0],
  txt: 'hello'
}, { number: 35, txt: 'bonjour!', things: [] }, {
  number: 43,
  txt: 'yo nigger',
  things: []
}, {
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
}, {
  id: '58d2a5818975fd0893fc1b5a',
  // deleteFaaId: '58d2a5818975fd0893fc8b6b' // will be added during the join
  // deleteFaaIds: '58d2a5818975fd0893fc8b6b' // will be added during the join
  number: 43,
  txt: 'yo nigger bis',
  things: [1]
}];

var postedSecondTestDocuments = exports.postedSecondTestDocuments = [{
  // will add myFaaId in the foos[0]
  testFooId_JOIN_myFaaId: '58d2a5818975fd0893fc8b2a',
  id: '58d2a5818975fd0893fc8b6e',
  txt: 'molky is fun. A lot.'
}, {
  // fooId: '58d2a5818975fd0893fc1b5a',
  // will push in foos[1] theFaaIds
  arrayFooId_JOIN_theFaaIds: '58d2a5818975fd0893fc8b5a',
  id: '58d2a5818975fd0893fc8b6b',
  txt: 'Karl Marx Landers'
}, {
  // fooId: '58d2a5818975fd0893fc8b5a',
  id: '58d2a5818975fd0893fc8b6c',
  // will add yourFaaId in the foos[0]
  stupidFooId_JOIN_yourFaaId: '58d2a5818975fd0893fc8b2a',
  txt: 'Too packed for life'
}];
function getPostTests(firstResult, secondResult) {
  var tests = [firstResult.documents.find(function (document) {
    return document.txt === 'hello';
  }).txt, secondResult.join.foos.find(function (document) {
    return document.txt === 'hello';
  }).myFaaId, secondResult.join.foos.find(function (document) {
    return document.txt === 'hello bis';
  }).theFaaIds[0]];
  return tests;
}
var postedTestDeepEquals = exports.postedTestDeepEquals = ['hello', '58d2a5818975fd0893fc8b6e', '58d2a5818975fd0893fc8b6b'];

// GET TEST
var gotTestQuery = exports.gotTestQuery = { number: 1 };
function getGetTests(result) {
  var documents = result.documents;

  return [documents[0].txt, documents[0].myFaa.txt, documents[1].theFaasById['58d2a5818975fd0893fc8b6b'].txt];
}
var gotTestDeepEquals = exports.gotTestDeepEquals = ['hello', 'molky is fun. A lot.', 'Karl Marx Landers'];

// PUT TEST
var putTestQuery = exports.putTestQuery = { number: 1 };
var putTestUpdate = exports.putTestUpdate = { $set: {
    txt: 'Guten Tag'
  } };
function getPutTests(result) {
  var tests = [result.documents[0].txt];
  return tests;
}
var putTestDeepEquals = exports.putTestDeepEquals = ['Guten Tag'];

var deletedTestQuery = exports.deletedTestQuery = {
  number: 43
};
function getDeleteTests(result) {
  return [result.documents.length];
}
var deletedTestDeepEquals = exports.deletedTestDeepEquals = [2];

// GET MERGED TEST
function getMergedGotTests(result) {
  var documents = result.documents;

  return [documents[0].myFaaId, documents[0].yourFaaId, documents[1].faaId, documents[1].theFaaIds];
}
var getMergedTestDeepEquals = exports.getMergedTestDeepEquals = ['58d2a5818975fd0893fc8b6e', '58d2a5818975fd0893fc8b6c', '58d2a5818975fd0893fc8b6b', ['58d2a5818975fd0893fc8b6b', '58d2a5818975fd0893fc8b6e']];

// ALL
var allTestDeepEquals = exports.allTestDeepEquals = [].concat(postedTestDeepEquals, gotTestDeepEquals, putTestDeepEquals, deletedTestDeepEquals);
var allMergedTestDeepEquals = exports.allMergedTestDeepEquals = [].concat(postedTestDeepEquals, getMergedTestDeepEquals, putTestDeepEquals, deletedTestDeepEquals);