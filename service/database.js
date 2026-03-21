const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');

(async function testConnection() {
    try {
        await db.command({ ping: 1 });
        console.log(`Connect to database`);
    } 
    catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();
 
function getUser(email) {
    return userCollection.findOne({email: email});
}
function getUserByToken(token) {
    return userCollection.findOne({token: token});
}
async function createUser(user) {
    await userCollection.insertOne(user);
    return user;
}
function updateUser(email, update) {
    if (!update && typeof userOrEmail === 'object') {
        return userCollection.updateOne(
            { email: userOrEmail.email }, 
            { $set: { token: userOrEmail.token } }
        );
    }
    return userCollection.updateOne({email: email}, update);
}
function updateUserByToken(token, update) {
    return userCollection.updateOne({token: token}, update);
}
async function addNotificationToFollowers(senderEmail, palette) {
    return userCollection.updateMany(
        {following: senderEmail},
        {$push: {notifications: {from: senderEmail, palette: palette}}}
    );
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    updateUser,
    updateUserByToken,
    addNotificationToFollowers,
};