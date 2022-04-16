import mongoose, { ConnectOptions, Mongoose } from 'mongoose';

const connect = async () => {
  const connectionURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/simpleshop';

  const connectionOptions: ConnectOptions = {
    appName: 'SimpleShop',
    dbName: 'simpleshop',
  };
  try {
    const dbConnection: Mongoose = await mongoose.connect(connectionURI, connectionOptions);
    console.log(`Connected to ${dbConnection.connection.db.databaseName}`);
  } catch (err) {}
};

const connectMock = async () => {
  const connectionURI =
    'mongodb+srv://user_shop:1l5B98yYNc2FQaWp@cluster0.3yu8q.mongodb.net/simpleshop?retryWrites=true&w=majority&authSource=admin' ||
    'mongodb://localhost:27017/simpleshop';

  const connectionOptions: ConnectOptions = {
    appName: 'SimpleShop',
    dbName: 'simpleshop',
  };
  try {
    const dbConnection: Mongoose = await mongoose.connect(connectionURI, connectionOptions);
    //  console.log(`Connected to ${dbConnection.connection.db.databaseName}`);
  } catch (err) {}
};

const dropMockDb = async () => {
  await mongoose.connection.db.dropDatabase();
};

const dropCollection = async (collection_name: string) => {
  await mongoose.connection.db.dropCollection(collection_name);
};

const closeMock = async () => {
  try {
    const dbConnection = await mongoose.disconnect();
  } catch (err) {}
};

export { connect, connectMock, closeMock, dropMockDb, dropCollection };
