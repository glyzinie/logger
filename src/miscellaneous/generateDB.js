const { Pool } = require('pg')

require('dotenv').config()

const pool = new Pool({
  user: process.env.POSTGRES_USER, // Make sure POSTGRES_USER is a superuser
  host: process.env.POSTGRES_HOST,
  database: 'template1', // Should exist in all postgres databases by default
  password: process.env.POSTGRES_PASSWORD,
  port: 5432
})

pool.on('error', e => {
  console.error('There was an error while generating the database structure!', e)
})

async function generate() {
  await pool.query(`CREATE DATABASE IF NOT EXISTS ${process.env.POSTGRES_DB}`) // create db
  const loggerDB = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432
  })
  await loggerDB.query('CREATE TABLE IF NOT EXISTS messages ( id TEXT PRIMARY KEY, author_id TEXT NOT NULL, content TEXT, attachment_b64 TEXT, ts TIMESTAMPTZ )') // establish messages table
  await loggerDB.query('CREATE TABLE IF NOT EXISTS guilds ( id TEXT PRIMARY KEY, owner_id TEXT NOT NULL, ignored_channels TEXT[], disabled_events TEXT[], event_logs JSON, log_bots BOOL, custom_settings JSON )') // establish guilds table
  console.log('DB Generated!')
}

generate()
