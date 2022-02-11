const { Router } = require('express');
const res = require('express/lib/response');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res) => {
    const post = await Post.insert({
      text: req.body.text,
      user_id: req.user.id,
    });
    res.json(post);
  })
  .get('/', authenticate, async (req, res) => {
    const post = await Post.getAll();

    res.json(post);
  });
