'use strict';

let array = require('../common/arraySingleton');

const _ = require('lodash');
const helper = require('../common/helper');
const constants = require('../common/constants');

module.exports = (req, res) => {
    let page = _.isFinite(Number(req.query.page)) ? Number(req.query.page) : 0;
    let topics = array;
    console.log(topics);
    let isSort = (req.query.sortType === 'desc');
    if (isSort) {
        topics = helper.sortByVote(array);
        console.log('sorted array');
    }
    let obj = helper.getCurrentPage(page, topics, constants.OFFSET, isSort);
    console.log(obj);
    if (isSort && req.xhr) obj.layout = false;
    return res.render('body', obj);
};
