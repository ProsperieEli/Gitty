const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Post = require('../lib/models/Post');

jest.mock('../lib/utils/GitHubUser');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to github', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri${process.env.GH_REDIRECT_URI}`
    );
  });
  it('should login and redirect', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/login/callback/?code=42')
      .redirects(1);

    expect(res.body).toEqual({
      id: expect.any(String),
      // login: 'fake_user',
      email: 'elijahprosperie@gmail.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('should create a post', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback/?code=42').redirects(1);

    const res = await agent.post('/api/v1/post').send({
      text: 'Creating',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      text: 'Creating',
      user_id: expect.any(String),
    });
  });

  it('should get all post', async () => {
    const agent = request.agent(app);
    await agent.get('/api/v1/github/login/callback/?code=42').redirects(1);

    await agent.post('/api/v1/post').send({
      text: 'Creating',
    });

    const res = await agent.get('/api/v1/post');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        text: 'Creating',
        user_id: expect.any(String),
      },
    ]);
  });

  it('should delete a session', async () => {
    const res = await request
      .agent(app)
      .delete('/api/v1/github/sessions')
      .send({
        email: 'elijahprosperie@gmail.com',
      });

    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfully!',
    });
  });
});
