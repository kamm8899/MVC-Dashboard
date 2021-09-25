const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) =>{
    Post.findAll({
        where:{
            //use the ID from the session
            user_id: req.session.user_id
        },
        attributes:[
            'id',
            'title',
            'post_content',
            'created_at',
        ],
        include:[
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at' ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes:['username']
            }
        ]
    })
    .then(dbPostData =>{
        //serialize data before passing to template
        const posts = dbPostData.map(post => post.get({plain: true}));
        res.render('dashboard', {posts, loggedIn: true});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (res, req) =>{
  const outerRequestPrint = Object.keys(req);
  const innerRequestPrint = Object.keys(req.req);
  const actualRequestId = parseInt(req.req.params.id);

  console.log("\n\n");
  console.log("===== Outer Request =====");
  console.log(outerRequestPrint);

  console.log("===== Inner Request =====");
  console.log(innerRequestPrint);

  console.log("The id is _actually_ in `req.req.params.id` => " + actualRequestId);
  console.log("\n\n");

    Post.findOne({
      where:{
        id: actualRequestId,
      }, 
        attributes: [
          'id',
          'title',
          'post_content',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          if (dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
          return;
        }
            const post = dbPostData.get({plain: true });
            
            res.render('edit-post', {post,loggedIn: true});
          })
        .catch(err => {
          req.req.res.status(500).json(err);
        });
    });

    //add create route for post
    router.get('/create', withAuth, (req,res) =>{
      console.log()
      Post.findAll({
        where:{
          user_id: req.session.user_id
        },
        attributes:[
          'id',
          'title',
          'created_at',
          'post_content'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(dbPostData => {
          // serialize data before passing to template
          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('create-post', { posts, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
    


module.exports = router;