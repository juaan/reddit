'use strict';

module.exports = (req, res) => {
    let obj = {
        title: 'Mantap'
    };
    return res.render('body', obj);
};
