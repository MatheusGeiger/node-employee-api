var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var config = require('../config/secret');
const User = require('../models/user');

function validHeaders(headers) {
    let headersContract = {
        status: 'valid',
        headersExpected: ['authorization', 'username', 'password']
    };
    headersContract['headersExpected'].map(header => {
        if (!(header in headers)) {
            headersContract[header] = `No ${header} provided.`;
            headersContract['status'] = 'invalid';
        }
    });
    return headersContract;
}

async function verifyToken(req, res, next) {
    const responseValidHeaders = validHeaders(req.headers);
    if ('valid' === responseValidHeaders.status) {

        var password = req.headers['password'];
        var username = req.headers['username'];
        var token = req.headers['authorization'].split(' ')[1];
        try {
            const user = await User.findOne({ 'username': username }).select('+password');
            if (user && bcrypt.compareSync(password, user.password)) {
                jwt.verify(token, config.secret, function (err, decoded) {
                    if (err)
                        return res.status(401).send({ 
                            auth: false, 
                            message: 'Failed to authenticate token.' 
                        });
                    req.userId = decoded.id;
                    next();
                });
            } else {
                res.status(401).send({ auth: false, message: 'Invalid credentials' });
            }
        } catch (error) {
            return res.status(500).send({ auth: false, message: error.message });
        }
    } else {
        res.status(403).send({ auth: false, message: responseValidHeaders });
    }
}

module.exports = verifyToken;