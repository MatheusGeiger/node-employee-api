
const mongoose = require('mongoose');

const conn = mongoose.connect(
    process.env.MONGODB_ENDPOINT, 
    { useNewUrlParser: true }
).then(result => console.log(`Connected! - Success ${JSON.stringify(result)}`))
.catch(err => {
    let msg = `Could not connect to mongo database! - Error ${JSON.stringify(err)}`;
    console.log(msg);
});

module.exports = conn;