const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const multer = require('multer');

// Configuration de Multer pour le stockage des images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Configuration de la base de données PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};


// Route pour créer un nouvel aquarium
router.post('/create-aquarium', verifyToken, async (req, res) => {
    try {
        const { name, description } = req.body;

        const newAquarium = await pool.query(
            'INSERT INTO aquariums (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
            [name, description, req.user]
        );

        res.json(newAquarium.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour ajouter une mesure à un aquarium spécifique
router.post('/add-measure/:aquariumId', verifyToken, async (req, res) => {
    try {
        const { date, pH, nitrites, nitrates, conductivity, TDS } = req.body;
        const { aquariumId } = req.params;

        const newMeasure = await pool.query(
            'INSERT INTO measures (aquarium_id, date, pH, nitrites, nitrates, conductivity, TDS) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [aquariumId, date, pH, nitrites, nitrates, conductivity, TDS]
        );

        res.json(newMeasure.rows[0]);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour récupérer tous les aquariums d'un utilisateur
router.get('/my-aquariums', verifyToken, async (req, res) => {
    try {
        const aquariums = await pool.query('SELECT * FROM aquariums WHERE user_id = $1', [req.user]);
        res.json(aquariums.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour récupérer les détails d'un aquarium spécifique
router.get('/aquarium/:aquariumId', verifyToken, async (req, res) => {
    try {
        const { aquariumId } = req.params;
        const aquarium = await pool.query('SELECT * FROM aquariums WHERE id = $1 AND user_id = $2', [aquariumId, req.user]);
        if (aquarium.rows.length === 0) {
            return res.status(404).json({ error: 'Aquarium not found' });
        }
        res.json(aquarium.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour mettre à jour les détails d'un aquarium
router.put('/aquarium/:aquariumId', verifyToken, async (req, res) => {
    try {
        const { name, description } = req.body;
        const { aquariumId } = req.params;
        const updatedAquarium = await pool.query(
            'UPDATE aquariums SET name = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [name, description, aquariumId, req.user]
        );
        if (updatedAquarium.rows.length === 0) {
            return res.status(404).json({ error: 'Aquarium not found' });
        }
        res.json(updatedAquarium.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour supprimer un aquarium
router.delete('/aquarium/:aquariumId', verifyToken, async (req, res) => {
    try {
        const { aquariumId } = req.params;
        const deletedAquarium = await pool.query('DELETE FROM aquariums WHERE id = $1 AND user_id = $2 RETURNING *', [aquariumId, req.user]);
        if (deletedAquarium.rows.length === 0) {
            return res.status(404).json({ error: 'Aquarium not found' });
        }
        res.json({ message: 'Aquarium deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour ajouter/modifier la photo de l'aquarium
router.post('/aquarium/:aquariumId/photo', verifyToken, upload.single('aquariumPhoto'), async (req, res) => {
    try {
        const photoPath = req.file.path;
        const { aquariumId } = req.params;
        const updatedAquarium = await pool.query(
            'UPDATE aquariums SET photo_url = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            [photoPath, aquariumId, req.user]
        );
        if (updatedAquarium.rows.length === 0) {
            return res.status(404).json({ error: 'Aquarium not found' });
        }
        res.json(updatedAquarium.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour récupérer toutes les mesures d'un aquarium spécifique
router.get('/measures/:aquariumId', verifyToken, async (req, res) => {
    try {
        const { aquariumId } = req.params;
        const measures = await pool.query('SELECT * FROM measures WHERE aquarium_id = $1', [aquariumId]);
        res.json(measures.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour mettre à jour une mesure spécifique
router.put('/measure/:measureId', verifyToken, async (req, res) => {
    try {
        const { date, pH, nitrites, nitrates, conductivity, TDS } = req.body;
        const { measureId } = req.params;
        const updatedMeasure = await pool.query(
            'UPDATE measures SET date = $1, pH = $2, nitrites = $3, nitrates = $4, conductivity = $5, TDS = $6 WHERE id = $7 RETURNING *',
            [date, pH, nitrites, nitrates, conductivity, TDS, measureId]
        );
        if (updatedMeasure.rows.length === 0) {
            return res.status(404).json({ error: 'Measure not found' });
        }
        res.json(updatedMeasure.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour supprimer une mesure spécifique
router.delete('/measure/:measureId', verifyToken, async (req, res) => {
    try {
        const { measureId } = req.params;
        const deletedMeasure = await pool.query('DELETE FROM measures WHERE id = $1 RETURNING *', [measureId]);
        if (deletedMeasure.rows.length === 0) {
            return res.status(404).json({ error: 'Measure not found' });
        }
        res.json({ message: 'Measure deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour ajouter un enregistrement de changement d'eau
router.post('/aquarium/:aquariumId/water-change', verifyToken, async (req, res) => {
    try {
        const { date, notes } = req.body;
        const { aquariumId } = req.params;
        const newWaterChange = await pool.query(
            'INSERT INTO water_changes (aquarium_id, date, notes) VALUES ($1, $2, $3) RETURNING *',
            [aquariumId, date, notes]
        );
        res.json(newWaterChange.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Route pour récupérer l'historique des changements d'eau pour un aquarium
router.get('/aquarium/:aquariumId/water-changes', verifyToken, async (req, res) => {
    try {
        const { aquariumId } = req.params;
        const waterChanges = await pool.query('SELECT * FROM water_changes WHERE aquarium_id = $1', [aquariumId]);
        res.json(waterChanges.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;