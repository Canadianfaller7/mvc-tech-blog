const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {exclude: ['password']},
          attributes: ['username'],
        },
        {
          model: Comment,
          include: [User]
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', withAuth, async (req, res) => {

  const postId = req.params.id;

  try {
    const postData = await Post.findAll({ 
      where: { id: postId }
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('post', {
      posts,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  } 
});
    
router.get("/newPost", withAuth, (req, res) => {
	try {
		res.render("newPost", {
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
     where: {
        user_id: req.session.user_id,
     },
     order: [
      ["date_created", "DESC"],
    ],
     include: [
          {
            model: User,
          },
          {
            model: Comment,
            include: [User]
          },
        ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// If the user is already logged in, redirect the request to another route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;