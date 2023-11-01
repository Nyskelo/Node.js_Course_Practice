import dotenv from 'dotenv';
import http from 'http';
import mongoose from 'mongoose';

import app from './src/app';

dotenv.config();

const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';

const server = http.createServer(app);

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log(`Connected to db!`);

    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`Docs available at http://localhost:${PORT}/docs`);
    });
  })
  .catch(err => {
    console.log('Error connecting to the database: ', err);
    process.exit(1);
  });
