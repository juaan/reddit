'use strict';

let array;
let self = module.exports;

/**
* This array is used to hold the submitted topic(s).
* @return {Array}
*/
exports.initialize = () => {
    if (!array) {
        array = [];
    }
    return array;
};

module.exports = self.initialize();
