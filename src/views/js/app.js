'use strict';

$(document).ready(function () {
    $('#submit-btn').click(function () {
        let topic = document.getElementById('input-field').value;
        if (topic.length > 255) {
            alert('Text length cannot be longer than 255');
        }
    });
});
