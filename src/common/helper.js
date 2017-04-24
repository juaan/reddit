'use strict';

const _ = require('lodash');

exports.getCurrentPage = (page, array, offset, isSort) => {
    let count = 0;
    let begin = 0;
    let end = offset;
    let reversedArray = _.clone(array);
    reversedArray = (isSort) ? reversedArray : reversedArray.reverse();
    while (count < page) {
        begin = end;
        end = begin + offset;
        count++;
    }

    console.log('reversed array ', reversedArray);
    let obj = {
        topics: reversedArray.slice(begin, end),
        hasNext: {
            status: !_.isNil(reversedArray[end]),
            page: page + 1
        },
        hasPrev: {
            status: !_.isNil(reversedArray[begin - 1]),
            page: page - 1
        },
        page: page,
        sort: (isSort) ? 'desc' : 'default'
    };

    return obj;
};

exports.sortByVote = (array) => {
    let clone = _.clone(array);
    return clone.sort((a, b) => {
        return b.votes - a.votes;
    });
};
