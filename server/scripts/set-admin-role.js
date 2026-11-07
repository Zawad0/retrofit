require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error('Usage: node scripts/set-admin-role.js <account-email>');
    process.exitCode = 2;
    return;
  }

  const mongoUri = process.env.MONGODB_URI?.trim();
  if (!mongoUri || !/^mongodb(?:\+srv)?:\/\//.test(mongoUri)) {
    console.error('MONGODB_URI is missing or invalid in server/.env. Use a mongodb:// or mongodb+srv:// connection string.');
    process.exitCode = 2;
    return;
  }

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    const user = await User.findOne({ email }).select('_id email role');
    if (!user) {
      console.error(`No RetroFit account found for ${email}. Create the account first, then rerun this command.`);
      process.exitCode = 3;
      return;
    }
    if (user.role === 'admin') {
      console.log(`${email} already has admin access.`);
      return;
    }

    user.role = 'admin';
    await user.save();
    console.log(`Admin role granted to ${email}. Sign out and sign back in to refresh the session.`);
  } catch {
    console.error('Could not update the account. Check MongoDB Atlas connectivity, credentials, and network access in server/.env. No connection details were printed.');
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

main();
