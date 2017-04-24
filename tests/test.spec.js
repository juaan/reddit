'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const chaiPromise = require('chai-as-promised');

const server = require('../src/index');
const helper = require('../src/common/helper');

chai.use(chaiHttp);
chai.use(chaiPromise);
const request = chai.request.agent(server);

describe('Testing', function () {
  let response;
  let voteUrl = '/api/vote';
  let submitUrl = '/submit/haha';

  let params = {
    query: {
      topic: 'haha',
      voteType: 'up'
    }
  };

  context('Testing /api/vote/ upvote', () => {
    before('get response from the API', () => {
      return request.get(submitUrl)
        .then(() => {
          return request.get(voteUrl).query(params.query);
        })
        .then((res) => {
          response = res.body;
        });
    });

    it('Success response string should exist', () => {
      expect(response.success).to.be.equals('Vote sucessfully updated');
    });

    it('after upvoting vote count should be equal to 1', () => {
      expect(response.voteCount).to.be.equals(1);
    });
  });

  context('Testing /api/vote/ downvote', () => {
    before('Hit vote api (downvote)', () => {
      params.query.voteType = 'down';
      return request.get(voteUrl)
        .query(params.query)
        .then((res) => {
          response = res.body;
        });
    });

    it('Success response string should exist', () => {
      expect(response.success).to.be.equals('Vote sucessfully updated');
    });

    it('after downvoting vote count should be equal to 0', () => {
      expect(response.voteCount).to.be.equals(0);
    });
  });

  context('Testing common functions', () => {
    let obj1 = {
      topic: 'Yoyo',
      votes: 5,
      timestamp: 13
    };

    let obj2 = {
      topic: 'Hello',
      votes: 6,
      timestamp: 12
    };

    let sortedArray;
    let response = helper.getCurrentPage(0, [obj1, obj2], 5, true);

    it('First array elements votes should be higher than the second one', () => {
      sortedArray = helper.sortByVote([obj1, obj2]);
      expect(sortedArray[0].votes).to.be.above(sortedArray[1].votes);
    });

    it('If votes are equal, first elements timestamp should be higher than the second one', () => {
      obj1.votes = 6;
      sortedArray = helper.sortByVote([obj1, obj2]);
      expect(sortedArray[0].timestamp).to.be.greaterThan(sortedArray[1].timestamp);
    });

    it('if isSort is true, the array should not be reversed', () => {
      expect(response.topics[0].topic).to.be.equals('Yoyo');
    });

    it('If page is passed as 0, then response.page should also be 0', () => {
      expect(response.page).to.be.equals(0);
    });

    it('If page is passed as 0, then response.hasNext.page should be 1', () => {
      expect(response.hasNext.page).to.be.equals(1);
    });

    it('If page is passed as 0, then response.hasPrev.page should be -1', () => {
      expect(response.hasPrev.page).to.be.equals(-1);
    });

    it('if isSort is true, sort object should be equal to desc', () => {
      expect(response.sort).to.be.equals('desc');
    });
  });
});
