const pool = require('../utils/pool');

module.exports = class GitHubUser {
  id;
  email;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
  }

  static async insert({ email }) {
    const { rows } = await pool.query(
      `
      INSERT INTO gitHub_users (email) VALUES ($1) RETURNING *`,
      [email]
    );
    return new GitHubUser(rows[0]);
  }

  static async getByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT * FROM gitHub_users WHERE email=$1`,
      [email]
    );
    if (!rows[0]) return null;
    return new GitHubUser(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM gitHub_users`);

    return rows.map((row) => new GitHubUser(row));
  }
};
