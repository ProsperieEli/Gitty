const pool = require('../utils/pool');

module.exports = class Post {
  id;
  text;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
  }

  static async insert({ text }) {
    const { rows } = pool.query(
      `
      INSERT INTO posts (text) VALUE ($1)
      RETURNING *`,
      [text]
    );
    return new Post(rows[0]);
  }
};
