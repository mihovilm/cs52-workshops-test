import Poll from '../models/poll';

export const getPolls = () => {
  return Poll.findAll();
};

export const createPoll = (poll) => {
  // takes in an object with the fields that poll should have
  // and saves them to the database
  // returns a promise

  const fields = {
    text: poll.text,
    imageURL: poll.imageURL,
  };

  return Poll.create(fields);
};

export const vote = (pollID, upvote) => {
  // takes in the poll id to update and a boolean of whether
  // to update or not.
  // returns a promise
  return Poll.findByPk(pollID).then((poll) => {
    console.log(`updating vote: ${poll} ${upvote}`);
    if (upvote) {
      return poll.increment('upvotes');
    } else {
      return poll.increment('downvotes');
    }
  });
};
