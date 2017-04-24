'use strict';

let hashMap;
let self = module.exports;

/**
* Returns a Map for efficient lookup. This map object is used to efficiently check for existing topics,
* and to check the position of a particular topic when upvote/downvote button is clicked.
* @return {Object} hashMap
*/
exports.initialize = () => {
    if (!hashMap) {
        // Use map to check if topic exists in O(1) time.
        hashMap = new Map();
    }
    return hashMap;
};

module.exports = self.initialize();
