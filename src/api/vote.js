'use strict';

let hashMap = require('../common/hashMapSingleton');
let array = require('../common/arraySingleton');

const _ = require('lodash');

/**
* API endpoint to vote for a particular topic
* /api/vote/ (POST)
* body: topic, voteType
*
*
* @param  {Object} req request object
* @param  {Object} res response object
* @returns (JSON) Json object
*/
module.exports = (req, res) => {
    let topic = req.body.topic;
    let vote = (req.body.voteType === 1) ? 1 : -1;
    let position = hashMap.get(topic);
    if (!_.isNil(position)) {
        array[position].votes += vote;
        return res.status(200).send({
            success: 'Vote sucessfully updated',
            topic: topic,
            voteCount: array[position].votes
        });
    }
    return res.status(400).send({
        error: 'An error happened. Check the query string.'
    });
};
