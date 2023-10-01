const { Pool } = require('pg');
require('dotenv').config();

console.log(process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

async function setupDatabase() {
    try {
        // Créer la table des utilisateurs si elle n'existe pas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        // Créer la table des aquariums si elle n'existe pas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS aquariums (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                user_id INTEGER REFERENCES users(id),
                photo_url VARCHAR(255)
            );
        `);

        // Créer la table des mesures si elle n'existe pas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS measures (
                id SERIAL PRIMARY KEY,
                aquarium_id INTEGER REFERENCES aquariums(id),
                date DATE NOT NULL,
                pH NUMERIC,
                nitrites NUMERIC,
                nitrates NUMERIC,
                conductivity NUMERIC,
                TDS NUMERIC
            );
        `);

        // Créer la table des changements d'eau si elle n'existe pas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS water_changes (
                id SERIAL PRIMARY KEY,
                aquarium_id INTEGER REFERENCES aquariums(id),
                date DATE NOT NULL,
                notes TEXT
            );
        `);

        console.log('Database setup completed.');
    } catch (error) {
        console.error('Error setting up the database:', error);
    }
}

module.exports = setupDatabase;
