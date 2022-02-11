const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GitHubUser = require('../models/GitHubUser');
const {
  exchangeCodeForToken,
  getGitHubProfile,
} = require('../utils/GitHubUser');

const ONEDAY = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/login/callback', async (req, res) => {
    const token = await exchangeCodeForToken(req.query.code);
    const profile = await getGitHubProfile(token);

    let user = await GitHubUser.getByEmail(profile.login);

    if (!user) {
      user = await GitHubUser.insert({
        email: profile.email,
      });
    }
    const jwtSig = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });
    res
      .cookie('session', jwtSig, {
        httpOnly: true,
        maxAge: ONEDAY,
      })
      .redirect('/api/v1/github/dashboard');
  })

  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  })
  .delete('/sessions', (req, res) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully!' });
  });
