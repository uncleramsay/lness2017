module.exports = (app, competition, io) => {
  app.get('/voteShare', (req, res) => {
    res.status(200).send(competition.getVoteShare());
  });

  app.post('/vote/:name', (req, res) => {
    competition.vote(req.params.name);
    res.status(200).send(competition.getVoteShare());
  });
}
