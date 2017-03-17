'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTestsWithPostDocuments = getTestsWithPostDocuments;
exports.getTestsWithGetDocuments = getTestsWithGetDocuments;
exports.getTestsWithPutDocuments = getTestsWithPutDocuments;
exports.getTestsWithDeleteDocuments = getTestsWithDeleteDocuments;
exports.getTestsWithGetMergedDocuments = getTestsWithGetMergedDocuments;
var TEST_MONGO_URL = exports.TEST_MONGO_URL = 'mongodb://localhost/transactionx-express-test';
var FIRST_TEST_COLLECTION_NAME = exports.FIRST_TEST_COLLECTION_NAME = 'foos';
var SECOND_TEST_COLLECTION_NAME = exports.SECOND_TEST_COLLECTION_NAME = 'faas';
var TEST_PORT = exports.TEST_PORT = 5000;
var TEST_EXPRESS_URL = exports.TEST_EXPRESS_URL = 'http://0.0.0.0:' + TEST_PORT;
var TEST_PATH = exports.TEST_PATH = '/api';
var FIRST_TEST_API_URL = exports.FIRST_TEST_API_URL = '' + TEST_EXPRESS_URL + TEST_PATH + '/' + FIRST_TEST_COLLECTION_NAME;
var SECOND_TEST_API_URL = exports.SECOND_TEST_API_URL = '' + TEST_EXPRESS_URL + TEST_PATH + '/' + SECOND_TEST_COLLECTION_NAME;

var postedFirstTestDocuments = exports.postedFirstTestDocuments = [{ number: 1, txt: 'hello', 'things': [0],
  myFaaId: '58d2a5818975fd0893fc8b6e', yourFaaId: '58d2a5818975fd0893fc8b6c' }, { number: 35, txt: 'bonjour!', 'things': [] }, { number: 43, txt: 'yo nigger', 'things': [] }, { number: 1, txt: 'hello bis', 'things': [3],
  faaId: '58d2a5818975fd0893fc8b6b',
  theFaaIds: ['58d2a5818975fd0893fc8b6b', '58d2a5818975fd0893fc8b6e'] }, { number: 43, txt: 'yo nigger bis', 'things': [1] }];

var postedSecondTestDocuments = exports.postedSecondTestDocuments = [{ id: '58d2a5818975fd0893fc8b6e', txt: 'molky is fun. A lot.' }, { id: '58d2a5818975fd0893fc8b6b', txt: 'Karl Marx Landers' }, { id: '58d2a5818975fd0893fc8b6c', txt: 'Too packed for life' }];
var gotTestQuery = exports.gotTestQuery = { number: 1 };
var putTestQuery = exports.putTestQuery = { number: 1 };
var putTestUpdate = exports.putTestUpdate = { $set: { txt: 'Guten Tag' } };

var deletedTestQuery = exports.deletedTestQuery = { number: 43 };

function getTestsWithPostDocuments(documents) {
  return [documents[0].txt];
}
var postedTestDeepEquals = exports.postedTestDeepEquals = ['hello'];

function getTestsWithGetDocuments(documents) {
  return [documents[0].txt, documents[0].myFaa.txt, documents[1].theFaas[0].txt];
}
var gotTestDeepEquals = exports.gotTestDeepEquals = ['hello', 'molky is fun. A lot.', 'Karl Marx Landers'];

function getTestsWithPutDocuments(documents) {
  return [documents[0].txt];
}
var putTestDeepEquals = exports.putTestDeepEquals = ['Guten Tag'];

function getTestsWithDeleteDocuments(documents) {
  return [documents.length];
}
var deletedTestDeepEquals = exports.deletedTestDeepEquals = [2];

function getTestsWithGetMergedDocuments(documents) {
  return [documents[0].myFaaId, documents[0].yourFaaId, documents[1].faaId, documents[1].theFaaIds];
}
var getMergedTestDeepEquals = exports.getMergedTestDeepEquals = ['58d2a5818975fd0893fc8b6e', '58d2a5818975fd0893fc8b6c', '58d2a5818975fd0893fc8b6b', ['58d2a5818975fd0893fc8b6b', '58d2a5818975fd0893fc8b6e']];

var allTestDeepEquals = exports.allTestDeepEquals = [].concat(postedTestDeepEquals, gotTestDeepEquals, putTestDeepEquals, deletedTestDeepEquals);

var allMergedTestDeepEquals = exports.allMergedTestDeepEquals = [].concat(postedTestDeepEquals, getMergedTestDeepEquals, putTestDeepEquals, deletedTestDeepEquals);