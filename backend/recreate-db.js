const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

console.log('🔄 Connecting to MongoDB to recreate database...');

mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas');
    
    const dbName = mongoose.connection.name;
    console.log(`🧹 Dropping database: ${dbName}...`);
    
    try {
      await mongoose.connection.dropDatabase();
      console.log('✅ Database dropped successfully.');
      console.log('🚀 Your database will be automatically recreated when the app starts and document is saved.');
    } catch (err) {
      console.error('❌ Error dropping database:', err.message);
    } finally {
      await mongoose.connection.close();
      process.exit(0);
    }
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Ensure your current IP is whitelisted in MongoDB Atlas.');
    console.log('2. Check if your username/password are correct in .env.');
    console.log('3. Ensure the URI has the correct format.');
    process.exit(1);
  });
