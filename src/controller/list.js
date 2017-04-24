'use strict';

let array = require('../common/arraySingleton');

const _ = require('lodash');
const helper = require('../common/helper');
const offset = 10;

module.exports = (req, res) => {
    let page = _.isNumber(req.query.page) ? Number(req.query.page) : 0;
    let sortedArray = helper.sortByVote(array);
    let obj = {
        topics: helper.sliceArrayIntoChunks(page, sortedArray, offset)
    };
    return res.render('body', obj);
};
