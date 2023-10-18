import http from 'http';
import mongoose from 'mongoose';

import app from './src/app';

const PORT = process.env.PORT || 3000;
const CONNECTION_STRING = 'mongodb+srv://allaoleksyn:0x7EU2u6HoiYxPCS@cluster0.nqxzydv.mongodb.net/NODE_JS';

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
