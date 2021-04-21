const express = require('express');
const connectDB = require('./config/db');

// Initialize Express Server
const app = express();

// Connect DataBase
connectDB();
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profiles', require('./routes/api/profiles'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/resumes', require('./routes/api/resumes'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
