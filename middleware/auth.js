const jwt = require('jsonwebtoken')

const auth = (req, res) => {
    console.log(req.cookies);
    const token = req.cookies

    // if token is not availble
    if (!token){
        return res.status(403).send('token is not availabole')
    }

    // verify token

    try {
        const decode = jwt.verify(token, 'sparag')
        console.log(decode);
        req.user = decode


    } catch (error) {
        res.status(403).('token is invalid')
    }
   return next()
}

module.exports = auth ()