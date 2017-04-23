'use strict';

$(document).ready(function () {
    $('#submit-btn').click(function () {
        let inputField = document.getElementById('input-field');
        let topic = inputField.value;
        if (topic.length > 255) {
            alert('Text length cannot be longer than 255');
        } else if (topic.length === 0) {
            alert('Input cannot be empty');
        } else {
            submitData(topic)
                .done(() => {
                    push(topic);
                })
                .fail((jqXHR, textStatus, error) => {
                    let errorMessage = JSON.parse(jqXHR.responseText).error;
                    alert('Error : ' + errorMessage);
                });
        }
    });
});


let submitData = (topic) => {
    return $.ajax({
        url: '/submit/' + topic,
        method: 'GET',
        dataType: 'json'
    });
};


let push = (topic) => {
    let context = {
        topic: topic,
        votes: 0
    };
    let template = Handlebars.templates['topic.hbs'](context);
    $('#list').prepend(template);
};
