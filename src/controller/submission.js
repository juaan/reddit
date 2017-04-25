'use strict';

let hashMap = require('../common/hashMapSingleton');
let array = require('../common/arraySingleton');

const helper = require('../common/helper');
const constants = require('../common/constants');
const moment = require('moment');

/**
 * This function renders the product list when the submit button is clicked.
 * @param  {Object} req - request object
 * @param  {Object} res - response object
 */
module.exports = (req, res) => {
    let topic = req.body.topic;

    if (hashMap.has(topic)) {
        return res.status(400).send({
            error: 'Topic already exists'
        });
    }

    hashMap.set(topic, array.length);
    array.push({
        topic: topic,
        votes: 0,
        timestamp: moment().valueOf()
    });

    // Reverse the array in order to show the most recently inserted element first.
    let obj = helper.getCurrentPage(0, array, constants.OFFSET, false);
    obj.layout = false;
    return res.render('body', obj);
};
