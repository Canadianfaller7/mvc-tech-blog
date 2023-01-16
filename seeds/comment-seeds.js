const { Comment } = require('../models')

const commentData = [
  {
    "comment": "Test One.",
    "date_created": "01-15-2023",
    "user_id": 1,
    "post_id": 1
  },
  {
    "comment": "Test Two.",
    "date_created": "01-15-2023",
    "user_id": 2,
    "post_id": 2
  },
  {
    "comment": "Test Three",
    "date_created": "05-02-2019",
    "user_id": 3,
    "post_id": 3
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments