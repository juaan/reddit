'use strict';

let hashMap = require('../common/hashMapSingleton');
let array = require('../common/arraySingleton');

const _ = require('lodash');

module.exports = (req, res) => {
    let topic = req.query.topic;
    let vote = (req.query.voteType === 'up') ? 1 : -1;

    let position = hashMap.get(topic);
    if (!_.isNil(position)) {
        array[position].votes += vote;
        return res.status(200).send({
            success: 'Vote sucessfully updated'
        });
    }
    return res.status(400).send({
        error: 'An error happened. Check the query string.'
    });
};
