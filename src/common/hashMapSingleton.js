'use strict';

let hashMap;
let self = module.exports;

exports.initialize = () => {
    if (!hashMap) {
        // Use map to check if topic exists in O(1) time.
        hashMap = new Map();
    }
    return hashMap;
};

module.exports = self.initialize();
