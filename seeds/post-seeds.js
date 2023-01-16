const { Post } = require('../models')

const postData = [
  {
    "title": "This is a test",
    "description": "testing out my stuff.",
    "date_created": "01-15-2023",
    "user_id": 2
  },
  {
    "title": "Second Test",
    "description": "This will be my second test.",
    "date_created": "10-31-2044",
    "user_id": 3
  },
  {
    "title": "Third Test",
    "description": "What is up.",
    "date_created": "09-07-3250",
    "user_id": 1
  }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts