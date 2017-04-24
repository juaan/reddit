'use strict';

const _ = require('lodash');

exports.sliceArrayIntoChunks = (page, array, offset) => {
    let count = 0;
    let begin = 0;
    let end = offset;
    while (count < page) {
        begin = end + 1;
        end = begin + offset;
        count++;
    }
    return array.slice(begin, end + 1);
};

exports.sortByVote = (array) => {
    let clone = _.clone(array);
    return clone.sort((a, b) => {
        return a.votes - b.votes;
    });
};
