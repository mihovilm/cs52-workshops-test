// import mongoose, { Schema } from 'mongoose';

// const PollSchema = new Schema({
//   text: String,
//   imageURL: String,
//   upvotes: { type: Number, default: 0 },
//   downvotes: { type: Number, default: 0 },
// }, {
//   toJSON: {
//     virtuals: true,
//   },
// });

// PollSchema.virtual('score').get(function scoreCalc() {
//   return this.upvotes - this.downvotes;
// });

// // create model class
// const PollModel = mongoose.model('Poll', PollSchema);

// export default PollModel;


const poll = (sequelize, DataTypes) => {
  const Poll = sequelize.define('poll', {
    text: {
      type: DataTypes.STRING,
    },

    imageURL: {
      type: DataTypes.STRING,
    },

    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

  }, {
    getterMethods: {
      score() { return this.upvotes - this.downvotes; },
    },
  });

  Poll.associate = (models) => {
    Poll.belongsTo(models.Author);
  };

  return Poll;
};

export default poll;
