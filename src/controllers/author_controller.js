import Author from '../models/author';
import Poll from '../models/poll';

export const getAuthorPolls = (authorName) => {
  return Poll.findAll({
    include: [{
      model: Author,
      where: { name: authorName },
    }],
  });
};

export const getAuthorPolls2 = (authorName) => {
  return Poll.findAll({
    include: [{
      model: Author,
      where: { name: authorName },
    }],
  });
};
