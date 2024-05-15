const { Pool } = require('pg')

require('dotenv').config()

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: 'template1',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
})

pool.on('error', e => {
  console.error('There was an error while generating the database structure!', e)
})

async function generate() {
  if (!process.env.DOCKER) await pool.query(`CREATE DATABASE ${process.env.POSTGRES_DB}`) // create db
  const loggerDB = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ?? 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  })
  await loggerDB.query('CREATE TABLE IF NOT EXISTS messages ( id TEXT PRIMARY KEY, author_id TEXT NOT NULL, content TEXT, attachment_b64 TEXT, ts TIMESTAMPTZ )') // establish messages table
  await loggerDB.query('CREATE TABLE IF NOT EXISTS guilds ( id TEXT PRIMARY KEY, owner_id TEXT NOT NULL, ignored_channels TEXT[], disabled_events TEXT[], event_logs JSON, log_bots BOOL, custom_settings JSON )') // establish guilds table
  console.log('DB Generated!')
}

generate()
