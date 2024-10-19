const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Directory for static files
app.set('view engine', 'ejs'); // Set EJS Engine for templates

const users = []; // Users DB
const SECRET_KEY = 'supersecretkey'; // Key to crypt tokens

// Middleware to check JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(403).send('Access denied. No token provided.');
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Save info about users
        next();
    } catch (ex) {
        res.status(401).send('Invalid token.');
    }
};

// Main page
app.get('/', (req, res) => {
    res.render('index'); // Render index page
});

// Register new user
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Coincidence validation
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    // Crypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    
    res.send('User registered successfully');
});

// Users login and JWT
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(400).send('Invalid username or password');
    }

    // Async bcrypt to check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid username or password');
    }

    // JWT token generation
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
});

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
    res.send(`Hello ${req.user.username}, you are authorized!`);
});

// Check forms
app.post('/submit-form', (req, res) => {
    console.log(req.body); // log debug
    res.send('Form submitted successfully!');
});

// Form params
app.get('/user/:name', (req, res) => {
    const userName = req.params.name;
    res.render('user', { name: userName }); // render user page
});

// Running server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
