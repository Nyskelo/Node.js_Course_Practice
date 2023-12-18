import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// eslint-disable-next-line prefer-const
let mongoServer: MongoMemoryServer | undefined = undefined;

const connect = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const url = mongoServer.getUri();

  await mongoose.connect(url);
};

const dropDatabase = async () => {
  if (mongoServer) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  }
};

export { connect, dropDatabase };
