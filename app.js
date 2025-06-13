require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

// Database connection
require('./config/db');

// Middleware
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set true for HTTPS
}));

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/', require('./routes/adminRoutes'));
app.use('/', require('./routes/donorRoutes'));

// Swagger (Dev only)
if (process.env.NODE_ENV === 'development') {
  const setupSwagger = require('./swagger/swagger');
  setupSwagger(app);
}

// Home route
app.get('/', (req, res) => {
  if (req.session.user) {
    return res.send(`Welcome ${req.session.user.username}! <a href="/logout">Logout</a>`);
  }
  res.send(`
    <form action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});