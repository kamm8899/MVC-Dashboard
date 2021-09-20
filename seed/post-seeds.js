const { Post } = require('../models');

const postdata = [
  {
    title: 'First Post',
    post_content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    user_id: 1
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;