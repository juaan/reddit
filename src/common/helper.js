'use strict';

const _ = require('lodash');

/**
* Calculate interval used for pagination according to the given parameters
* When submitting a topic, the array will be reversed becase we need to show the most recent element first
* The array should not be reversed after sorting to maintain the sorting order
* Returns an object that will be parsed by handlebars file.
*
* {
    topics: determine the topics that will be loaded
    hasNext: {
        status: status of next button. True/False
        page: href of next page. Integer
    }
    hasPrev: {
        status: status of prev button. True/False
        page: href of prev page. Integer
    }
    page: current page. Integer
    sort: This is used to determine which sorting rule will be used when the user clicks next/prev button
  }
*
* @param  {Integer} page - Current page. Used to determine next and previous page links
* @param  {Array} array - array of current topics
* @param  {Integer} offset - offset
* @param  {Boolean} isSort - Used to determine whether or not the array should be reversed
* @return {Object} obj
*/
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

/**
* Returns an array sorted in descending order, based on the number of votes of each topic
* If the number of votes are equal, sort based on the order in which the topic is submitted
*
* @param  {Array} array
* @return {Array} - Sorted array
*/
exports.sortByVote = (array) => {
    let clone = _.clone(array);
    return clone.sort((a, b) => {
        let votes = b.votes - a.votes;
        let timestamp = b.timestamp - a.timestamp;
        return (votes === 0) ? timestamp : votes;
    });
};
