'use strict';

module.exports = (req, res) => {
    let obj = {
        topics: ['wakaka', 'kontol']
    };
    return res.render('body', obj);
};
