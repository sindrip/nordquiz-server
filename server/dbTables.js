const pg = require('pg');

require('./config/config');

const connectionString = process.env.DATABASE_URL;

const { Pool } = pg;
const pool = new Pool({
  connectionString,
});

var createdb = async () => {
  const client = await pool.connect()
  var query = (text, params) => client.query(text, params);
  try {

    await query('DROP TABLE IF EXISTS Users');
    await query('DROP TABLE IF EXISTS Questions');

    await query(`CREATE TABLE Users(
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT
      )`
    );

    await query(`CREATE TABLE Questions(
        id SERIAL PRIMARY KEY,
        question TEXT,
        image TEXT
      )`
    );

  } catch (e) {
      console.log(e);
  } finally {
    client.release()
    console.log('fin');
    pool.end();
  }
}

createdb().catch(e => console.log(e.stack));