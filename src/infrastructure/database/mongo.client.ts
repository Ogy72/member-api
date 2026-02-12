import mongoose = require('mongoose');

export const connectMongoClient = async (
    uri: string,
    label: string,
    dbName: string
) => {
    console.log(`Try connecting to MongoDB ${label}...`);

    await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
        dbName: dbName,
    });

    console.log(`Connected to MongoDB ${label}`);
}