const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  // create new category
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  // update/edit category by id
  try {
    const updatePost = await Post.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(updatePost)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  // delete category by id
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    })
    res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;