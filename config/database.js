const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL

exports.connect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,

        useUnifiedTopology: true
    })

    .then(console.log("DB Connected"))
    .catch((error)=> {
        console.log("DB Connection Fail")
        console.log("errror")
        process.exit(1)
    })
}