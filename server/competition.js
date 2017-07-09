const _ = require('lodash');

module.exports = class Competition {
  constructor() {
    this.votes = {
      evan: 0,
      mike: 0,
    };
  }

  vote(id) {
    this.votes[id] += 1;
  }

  getVoteShare() {
    const totalVotes = _.reduce(this.votes, (sum, vote) => sum + vote, 0);
    if (totalVotes === 0) {
      return _.mapValues(this.votes, () => 0);
    }

    return _.mapValues(this.votes, (vote) => (vote / totalVotes) * 100);
  }
}
