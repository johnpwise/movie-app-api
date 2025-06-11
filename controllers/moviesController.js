// controllers/moviesController.js
const db = require('../firebase');

exports.getAllMovies = async (req, res) => {
    try {
        const snapshot = await db.collection('movies').get();
        const movies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies', details: err.message });
    }
};

exports.addMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (id) {
            await db.collection('movies').doc(id).set(data);
            res.status(201).json({ id, ...data });
        } else {
            const docRef = await db.collection('movies').add(data);
            res.status(201).json({ id: docRef.id, ...data });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to add movie', details: err.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        await db.collection('movies').doc(id).set(data, { merge: true });
        res.json({ id, ...data });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update movie', details: err.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        await db.collection('movies').doc(id).delete();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete movie', details: err.message });
    }
};
