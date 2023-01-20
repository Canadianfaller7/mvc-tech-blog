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

  const postId = req.params.id;

  try {
    const updatedPost = await Post.update(
      {
      ...req.body
      },
      {
        where: { id: postId }
      }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
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