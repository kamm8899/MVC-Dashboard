const { Post } = require('../models');

const postdata = [
  {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    post_url: 'post_1',
    user_id: 1
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;