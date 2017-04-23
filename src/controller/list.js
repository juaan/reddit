'use strict';

let array = require('../common/arraySingleton');

module.exports = (req, res) => {
    return res.render('body', array);
};
