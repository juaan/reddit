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
            ajaxCall('/submit/' + topic)
                .done((response) => {
                    $('#body-content').html(response);
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
        let url = '/api/vote/?topic=' + topic + '&voteType=up';
        ajaxCall(url)
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
        let url = '/api/vote/?topic=' + topic + '&voteType=down';
        ajaxCall(url)
            .done()
            .fail((jqXHR, textStatus, error) => {
                let errorMessage = JSON.parse(jqXHR.responseText).error;
                alert('Error : ' + errorMessage);
            });
    });

     $('#sort-btn').click(function () {
         let page = document.getElementById('page').value;
         let url = '/?page=' + page + '&sortType=desc';
         ajaxCall(url)
            .done((response) => {
                $('#body-content').html(response);
            })
             .fail((jqXHR, textStatus, error) => {
                let errorMessage = JSON.parse(jqXHR.responseText).error;
                alert('Error : ' + errorMessage);
            });
     });
});

let ajaxCall = (url) => {
    return $.ajax({
        url: url,
        method: 'GET'
    });
};
