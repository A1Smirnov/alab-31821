const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static('public')); // Static
app.use(bodyParser.urlencoded({ extended: true }));

// Main route
app.get('/', (req, res) => {
  res.render('index');
});

// Form route
app.post('/submit-form', (req, res) => {
  console.log(req.body); // Test log to console
  res.send('Form submitted successfully!');
});

// Form parametr
app.get('/user/:name', (req, res) => {
  const userName = req.params.name;
  res.render('user', { name: userName });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
