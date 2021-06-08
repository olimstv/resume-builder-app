const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({ dir: '.', dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    const connectDB = require('./config/db');
    // const cors = require('cors');
    // Connect DataBase
    connectDB();

    // Init Middleware
    server.use(express.json({ extended: false }));
    // server.use(cors());

    server.get('/', (req, res) => res.send('API Running'));

    // Define Routes
    server.use('/api/users', require('./routes/api/users'));
    server.use('/api/profile', require('./routes/api/profile'));
    server.use('/api/auth', require('./routes/api/auth'));
    server.use('/api/resumes', require('./routes/api/resume'));
    server.use('/api/objectives', require('./routes/api/objectives'));

    // server.get('*', (req, res) => {
    //   return handle(req, res);
    // });
    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

// const connectDB = require('../config/db');
// const cors = require('cors');
// // Connect DataBase
// connectDB();

// // Init Middleware
// app.use(express.json({ extended: false }));
// app.use(cors());

// app.get('/', (req, res) => res.send('API Running'));

// // Define Routes
// app.use('/api/users', require('./api/users'));
// app.use('/api/profile', require('./api/profile'));
// app.use('/api/auth', require('./api/auth'));
// app.use('/api/resumes', require('./api/resume'));
// app.use('/api/objectives', require('./api/objectives'));
// // app.use('/api/objectives/:id', require('./routes/api/objectives'));

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
