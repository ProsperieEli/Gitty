const pool = require('../utils/pool');

module.exports = class GitHubUser {
  id;
  email;
  #passwordHash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
  }

  static async insert({ email, password_hash }) {
    const { rows } = await pool.query(
      `
      INSERT INTO gitHubUsers (email, password_hash) VALUE ($1, $2) RETURNING *`,
      [email, password_hash]
    );
    return new GitHubUser(rows[0]);
  }

  static async getByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT * FROM gitHubUsers WEHERE email=$1`,
      [email]
    );
    if (!rows[0]) return null;
    return new GitHubUser(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM gitHubUsers`);

    return rows.map((row) => new GitHubUser(row));
  }
};
