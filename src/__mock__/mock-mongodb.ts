import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

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

const dropCollections = async () => {
  if (mongoServer) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
};

export { connect, dropDatabase, dropCollections };
