'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getTestsWithPostDocumentsAndJoin = getTestsWithPostDocumentsAndJoin;
exports.getTestsWithGetDocuments = getTestsWithGetDocuments;
exports.getTestsWithPutDocumentsAndJoin = getTestsWithPutDocumentsAndJoin;
exports.getTestsWithDeleteDocumentsAndJoin = getTestsWithDeleteDocumentsAndJoin;
exports.getTestsWithGetMergedDocuments = getTestsWithGetMergedDocuments;
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
  // myFaaId: '58d2a5818975fd0893fc8b6e', // will be added during the join
  number: 1,
  things: [0],
  txt: 'hello',
  yourFaaId_JOIN_stupidFoo: '58d2a5818975fd0893fc8b6c'
}, { number: 35, txt: 'bonjour!', things: [] }, {
  number: 43,
  txt: 'yo nigger',
  things: []
}, {
  faaId: '58d2a5818975fd0893fc8b6b',
  id: '58d2a5818975fd0893fc8b5a',
  number: 1,
  theFaaIds: ['58d2a5818975fd0893fc8b6b', '58d2a5818975fd0893fc8b6e'],
  things: [3],
  txt: 'hello bis'
}, {
  id: '58d2a5818975fd0893fc1b5a',
  // deleteFaaId: '58d2a5818975fd0893fc8b6b'
  // deleteFaaIds: '58d2a5818975fd0893fc8b6b'
  number: 43,
  txt: 'yo nigger bis',
  things: [1]
}];

var postedSecondTestDocuments = exports.postedSecondTestDocuments = [{
  testFooId_JOIN_myFaaId: '58d2a5818975fd0893fc8b2a',
  id: '58d2a5818975fd0893fc8b6e',
  txt: 'molky is fun. A lot.'
}, {
  fooId_JOIN_deleteFaaId: '58d2a5818975fd0893fc1b5a',
  fooId_JOIN_deleteFaaIds: '58d2a5818975fd0893fc1b5a',
  id: '58d2a5818975fd0893fc8b6b',
  txt: 'Karl Marx Landers'
}, {
  fooId_JOIN_theFaaIds: '58d2a5818975fd0893fc8b5a',
  id: '58d2a5818975fd0893fc8b6c',
  // stupidFoo: '58d2a5818975fd0893fc8b2a',
  txt: 'Too packed for life'
}];
function getTestsWithPostDocumentsAndJoin(documents, join) {
  var tests = [documents.find(function (document) {
    return document.txt === 'hello';
  }).txt, documents.find(function (document) {
    return document.txt === 'hello';
  }).yourFaaId, join.foos.find(function (document) {
    return document.txt === 'hello';
  }).myFaaId, join.foos.find(function (document) {
    return document.txt === 'hello bis';
  }).theFaaIds[2]];
  return tests;
}
var postedTestDeepEquals = exports.postedTestDeepEquals = ['hello', '58d2a5818975fd0893fc8b6c', '58d2a5818975fd0893fc8b6e', '58d2a5818975fd0893fc8b6c'];

// GET TEST
var gotTestQuery = exports.gotTestQuery = { number: 1 };
function getTestsWithGetDocuments(documents) {
  return [documents[0].txt, documents[0].myFaa.txt, documents[1].theFaasById['58d2a5818975fd0893fc8b6b'].txt];
}
var gotTestDeepEquals = exports.gotTestDeepEquals = ['hello', 'molky is fun. A lot.', 'Karl Marx Landers'];

// PUT TEST
var putTestQuery = exports.putTestQuery = { number: 1 };
var putTestUpdate = exports.putTestUpdate = { $set: {
    txt: 'Guten Tag',
    yourFaaId_JOIN_: '58d2a5818975fd0893fc8b6b'
  } };
function getTestsWithPutDocumentsAndJoin(documents, join) {
  return [documents[0].txt, join.foos[0].yourFaaId];
}
var putTestDeepEquals = exports.putTestDeepEquals = ['Guten Tag', '58d2a5818975fd0893fc8b6b'];

var deletedTestQuery = exports.deletedTestQuery = {
  number: 43
};
function getTestsWithDeleteDocumentsAndJoin(documents, join) {
  return [documents.length, _typeof(join.faas[0].deleteFaaId), _typeof(join.faas[0].deleteFaaIds.length)];
}
var deletedTestDeepEquals = exports.deletedTestDeepEquals = [2, 'undefined', 0];

// GET MERGED TEST
function getTestsWithGetMergedDocuments(documents) {
  return [documents[0].myFaaId, documents[0].yourFaaId, documents[1].faaId, documents[1].theFaaIds];
}
var getMergedTestDeepEquals = exports.getMergedTestDeepEquals = ['58d2a5818975fd0893fc8b6e', '58d2a5818975fd0893fc8b6c', '58d2a5818975fd0893fc8b6b', ['58d2a5818975fd0893fc8b6b', '58d2a5818975fd0893fc8b6e']];

// ALL
var allTestDeepEquals = exports.allTestDeepEquals = [].concat(postedTestDeepEquals, gotTestDeepEquals, putTestDeepEquals, deletedTestDeepEquals);
var allMergedTestDeepEquals = exports.allMergedTestDeepEquals = [].concat(postedTestDeepEquals, getMergedTestDeepEquals, putTestDeepEquals, deletedTestDeepEquals);