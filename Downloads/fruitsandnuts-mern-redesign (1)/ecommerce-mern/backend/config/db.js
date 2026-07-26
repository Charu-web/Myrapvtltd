const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error(
      '\n❌ MONGO_URI is not set.\n' +
        '   Create backend/.env (copy .env.example) and set MONGO_URI to either:\n' +
        '     • a local MongoDB:   mongodb://localhost:27017/fruitsandnuts\n' +
        '     • a MongoDB Atlas connection string (Database → Connect → Drivers)\n'
    );
    process.exit(1);
  }

  try {
    // A short, explicit timeout means a bad/unreachable URI fails fast and
    // loudly instead of hanging for mongoose's default 30s before erroring.
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`\n❌ Could not connect to MongoDB: ${error.message}\n`);
    if (error.message.includes('ECONNREFUSED')) {
      console.error(
        '   It looks like nothing is listening on that address. If you meant to use a\n' +
          '   local MongoDB, make sure it is installed and running (e.g. `mongod` or\n' +
          '   `brew services start mongodb-community` / `sudo systemctl start mongod`),\n' +
          '   or switch MONGO_URI in backend/.env to a MongoDB Atlas connection string.\n'
      );
    } else if (error.message.toLowerCase().includes('authentication failed')) {
      console.error('   Check the username/password in your MONGO_URI.\n');
    } else if (error.message.toLowerCase().includes('querysrv') || error.message.toLowerCase().includes('getaddrinfo')) {
      console.error(
        '   DNS lookup failed for your Atlas hostname — double-check the cluster\n' +
          '   address in MONGO_URI, and that this machine has internet access.\n'
      );
    }
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error after initial connect: ${err.message}`);
  });
};

module.exports = connectDB;
