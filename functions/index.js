const functions = require('firebase-functions');
const algoliasearch = require('algoliasearch');


const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const ALGOLIA_INDEX_NAME = 'locations';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);


exports.onLocationAdded = functions.firestore.document('locations/{locationId}').onCreate((snap, context) => {
    // Get the location document
    const location = snap.data();
  
    // Add an 'objectID' field which Algolia requires
    location.objectID = context.params.locationId;
  
    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(location);
  });