// index.js

const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const sequelize = require('./db');

const app = express();

// ✅ Render assigns PORT automatically, fallback for local dev
const PORT = process.env.PORT || 3005;

// ✅ Allow CORS from local React + deployed Vercel frontend
app.use(cors({
  origin: [
    'http://localhost:3000',              // Local dev
    'https://test-client-psi-three.vercel.app/' // Your deployed frontend
  ],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'Nx7jK3Zp!eVr9Q2Lm0tCfYz^BwA6hGdu', // 🔐 Use env var on Render
  resave: false,
  saveUninitialized: false
}));

// Make session available in templates (if using views)
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

// ✅ Routes
app.use('/', require('./routes/pages'));
app.use('/api', require('./routes/api'));

// ✅ Start server after DB sync
sequelize.sync().then(() => {
  console.log('✅ Database synced.');
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
