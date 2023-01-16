const { User } = require('../models')

const userData = [
  {
    "username": "tester",
    "email": "tester@mail.com",
    "password": "password"
  },
  {
    "username": "tester2",
    "email": "tester2@mail.com",
    "password": "password123"
  },
  {
    "username": "tester3",
    "email": "teseter3@mail.com",
    "password": "Password123"
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers