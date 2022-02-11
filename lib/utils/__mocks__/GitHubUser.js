/*eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exhcangeCodeForToke(${code})`);
  return `MOCK_TOKEN_FOR_CODE${code}`;
};

const getGitHubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGitHubProfile(${token})`);
  return {
    login: 'fake_user',
    email: 'elijahprosperie@gmail.com',
  };
};

module.exports = { exchangeCodeForToken, getGitHubProfile };
