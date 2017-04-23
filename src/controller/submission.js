'use strict';

let hashMap = require('../common/hashMapSingleton');
let array = require('../common/arraySingleton');

module.exports = (req, res) => {
    let topic = req.params.topic;
    if (hashMap.has(topic)) {
        return res.status(404).send({
            error: 'Topic already exists'
        });
    }

    hashMap.set(topic, 0);
    array.push({
        topic: topic,
        votes: 0
    });

    return res.status(200).send({
        success: 'Topic succesfully inserted'
    });
};
