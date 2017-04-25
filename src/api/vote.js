'use strict';

let hashMap = require('../common/hashMapSingleton');
let array = require('../common/arraySingleton');

const _ = require('lodash');
const constants = require('../common/constants');

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
    let vote = constants.VOTE[req.body.voteType];
    let position = hashMap.get(topic);
    if (!_.isNil(position) && _.isFinite(vote)) {
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
