import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
// import * as Polls from './controllers/poll_controller';
import models, { sequelize } from './models';

// /////////// WORKSHOP //////////////
// Part 5
const eraseDatabaseOnSync = true;

const createAuthorsWithPolls = async () => {
  await models.Author.create(
    {
      name: 'tim',
      // notice how polls was not a field in the model..but now it became one after the 'associate' part
      // sequelize also pluralized it from poll to polls by itself!
      polls: [
        {
          text: 'Pangolins are cute',
          imageURL: 'https://media.giphy.com/media/uscuTAPrWqmqI/giphy.gif',
          upvotes: 69,
          downvotes: 69,
        },
      ],
    },
    {
      include: [models.Poll],
    },
  );

  await models.Author.create(
    {
      name: 'cool tim',
      polls: [
        {
          text: 'Pangolins are FREAKING AMAZING',
          imageURL: 'https://media.giphy.com/media/uscuTAPrWqmqI/giphy.gif',
          upvotes: 3000,
          downvotes: 0,
        },
      ],
    },
    {
      include: [models.Poll],
    },
  );
};

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createAuthorsWithPolls();
  }
});


// initialize
const app = express();

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// additional init stuff should go before hitting the routing

// default index route
app.get('/', (req, res) => {
  models.Poll.findAll({
    include: [{ model: models.Author }],
  })
    .then((polls) => {
      res.render('index', { polls });
    }).catch((error) => {
      res.send(`error: ${error}`);
    });
});

// GET new
app.get('/new', (req, res) => {
  res.render('new');
});


// POST new
app.post('/new', (req, res) => {
  const newpoll = {
    text: req.body.text,
    imageURL: req.body.imageURL,
  };

  models.Poll.create(
    newpoll, {
      include: [{ model: models.Author }],
    },
  )
    .then((poll) => {
      models.Author.findOrCreate({ where: { name: req.body.author } })
        .then((author) => {
          poll.setAuthor(author[0]);
          poll.save();
        })
        .then(() => {
          res.redirect('/');
        });
    });
});

// POST vote/:id
app.post('/vote/:id', (req, res) => {
  const vote = (req.body.vote === 'up');// convert to bool
  // models.Poll.vote(req.params.id, vote).then((result) => {
  //   res.send(result);
  // });

  models.Poll.findByPk(req.params.id).then((poll) => {
    console.log(`updating vote: ${poll} ${vote}`);
    if (vote) {
      poll.increment('upvotes');
    } else {
      poll.increment('downvotes');
    }
    res.send(poll);
  });
});

// GET author's posts
app.get('/author/:id', (req, res) => {
  models.Poll.findAll({
    where: { authorId: req.params.id },
    include: [{ model: models.Author }],
  })
    .then((polls) => {
      res.render('index', { polls });
    }).catch((error) => {
      res.send(`error: ${error}`);
    });
});

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`listening on: ${port}`);
