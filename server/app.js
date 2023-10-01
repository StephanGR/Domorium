const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const aquariumRoutes = require('./routes/aquarium');
const setupDatabase = require('./dbInit');

const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',  // Autorisez le port 3000 à faire des requêtes
    credentials: true, // Autorise les cookies et les en-têtes de session
};
app.options('*', cors(corsOptions)); // Gère les demandes OPTIONS pour toutes les routes
app.use(cors(corsOptions));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/aquarium', aquariumRoutes);
app.use('/uploads', express.static('uploads'));

async function startApp() {
    try {
        // Configurer la base de données
        await setupDatabase();

        // Démarrer le serveur
        const port = process.env.PORT || 3100;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error starting the app:', error);
    }
}

module.exports = app;
startApp();

