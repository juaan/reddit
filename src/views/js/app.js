'use strict';
/**
* This module contains the front-end logic for this app. Mostly about click events, error handling and ajax calls
*
*/
const constants = require('./constants');

$(document).ready(function () {
    $('#submit-btn').click(function () {
        let inputField = document.getElementById('input-field');
        let topic = inputField.value;
        if (topic.length > 255) {
            alert('Text length cannot be longer than 255');
        } else if (topic.length === 0) {
            alert('Input cannot be empty');
        } else {
            let data = {
                topic: topic
            };
            ajaxCall(constants.SUBMIT.URL, 'POST', data)
                .done((response) => {
                    $('#body-content').html(response);
                    let hostname = getHostname($(location).attr('href'));
                    window.history.replaceState({}, 'Reddit', hostname);
                })
                .fail((jqXHR, textStatus, error) => {
                    let errorMessage = JSON.parse(jqXHR.responseText).error;
                    alert('Error : ' + errorMessage);
                });
        }
    });

    $(document).on('click', '.upvote', function () {
        let topic = $(this).closest('li').find('a.topic').text();
        let $votes = $(this).closest('li').find('a.votes');
        let voteCount = Number($votes.text().split(' ')[0]) + 1;
        $votes.text(voteCount + ' Votes');
        let data = {
            topic: topic,
            voteType: constants.VOTE.UP
        };
        ajaxCall(constants.VOTE.URL, 'POST', data)
            .done()
            .fail((jqXHR, textStatus, error) => {
                let errorMessage = JSON.parse(jqXHR.responseText).error;
                alert('Error : ' + errorMessage);
            });
    });

    $(document).on('click', '.downvote', function () {
        let topic = $(this).closest('li').find('a.topic').text();
        let $votes = $(this).closest('li').find('a.votes');
        let voteCount = Number($votes.text().split(' ')[0]) - 1;
        $votes.text(voteCount + ' Votes');
        let data = {
            topic: topic,
            voteType: constants.VOTE.DOWN
        };
        ajaxCall(constants.VOTE.URL, 'POST', data)
            .done()
            .fail((jqXHR, textStatus, error) => {
                let errorMessage = JSON.parse(jqXHR.responseText).error;
                alert('Error : ' + errorMessage);
            });
    });

     $('#sort-btn').click(function () {
         let page = document.getElementById('page').value;
         let url = '/?page=' + page + '&sortType=desc';
         ajaxCall(url, 'GET')
            .done((response) => {
                $('#body-content').html(response);
            })
             .fail((jqXHR, textStatus, error) => {
                let errorMessage = JSON.parse(jqXHR.responseText).error;
                alert('Error : ' + errorMessage);
            });
     });
});

let ajaxCall = (url, method, data) => {
    let options = {
        url: url,
        method: method
    };
    if (data && method === 'POST') {
        options.data = data;
    }
    return $.ajax(options);
};

let getHostname = (url) => {
    let m = url.match(/^http:\/\/[^/]+/);
    return m ? m[0] : null;
};
