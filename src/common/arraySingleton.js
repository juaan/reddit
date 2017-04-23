'use strict';

let array;
let self = module.exports;

exports.initialize = () => {
    if (!array) {
        array = [];
    }
    return array;
};

module.exports = self.initialize();
