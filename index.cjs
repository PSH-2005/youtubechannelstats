const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const express = require('express');
const app = express();

const SECRET_KEY = 'your-secret-key';  // Use environment variables in production

// Dummy user for demo purposes
const users = [{ username: 'user1', password: bcrypt.hashSync('password1', 8) }];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('A token is required for authentication');

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
    next();
};

app.get('/dashboard', verifyJWT, (req, res) => {
    res.send(`Welcome ${req.user.username} to the dashboard!`);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
