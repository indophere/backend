import jwt from 'jsonwebtoken'
import key from './Profile-server/sys_conf.js'

function auth(req, res, next){
    const auth = req.body.token
    const auth_type = typeof(auth)
    if (auth == null) {
        return res.sendStatus(401)
    }
    jwt.verify(auth, key.key, (err, user) =>{
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
    next()
}

function login_token(data, random_id){
    return {session_token:jwt.sign(data, key.key, {expiresIn: '30m'}), ref_token:jwt.sign(random_id, key.key)}
}

function token(data){
    return jwt.sign(data, key.key, {expiresIn:'60m'})
}

export default {login_token: login_token, auth: auth, token:token}