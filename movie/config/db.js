const mongoose= require('mongoose');

const url=`${process.env.DB_CLIENT}://${process.env.DB_HOST}:${process.env.DB_PORT}`

const connectDB = async () => {
    mongoose.connect(url, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const connection= await mongoose.connection

    connection.on('connected', () => {
        console.log('Mongoose connected to DB Cluster')
    })

    connection.on('error', (error) => {
        console.error(error.message)
    })

    connection.on('disconnected', () => {
        console.log('Mongoose Disconnected')
    })

    //to debug and console query in whole project
    // mongoose.set("debug", (collectionName, method, query, doc) => {
    //     console.log(`\n${collectionName}.${method}`, JSON.stringify(query), doc);
    // });
}

const connectTestDB = async () => {
    const url=`${process.env.DB_CLIENT}://${process.env.DB_HOST}:${process.env.DB_PORT}`
    mongoose.connect(url, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    await mongoose.connection
}

const disconnectDB = async () => {
    await mongoose.connection.close();
}

module.exports = {
    connectDB,
    connectTestDB,
    disconnectDB
}