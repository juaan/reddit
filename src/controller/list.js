'use strict';

let array = require('../common/arraySingleton');

module.exports = (req, res) => {
    let obj = {
        topics: array
    };
    return res.render('body', obj);
};
