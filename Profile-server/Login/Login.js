import random from 'randomatic'
import sys from '../sys_conf.js'
import profileSchema from '../Schemas/Usr-profile.js'
import Auth from "../../Auth.js"

function Login(req, res){
    const Auth_rec = req.body.Auth
    const code = req.body.code
    var query = {}

    if (!Auth_rec){
        return res.status(500).json({message:"No authentication data was provided."})
    }
    else if(!code){
        return res.status(500).json({message:"OTP has not been provided"})
    }
    if(Auth_rec.username){
        query= { 'Auth.username': Auth_rec.username}
    }
    else if(Auth_rec.email){
        query = { 'Auth.email':Auth_rec.email}
    }
    else if(Auth_rec.phone){
        query = {phone: Auth_rec.phone}
    }
    else{
        return res.status(500).json({message:"Proper authenticaion data was not filed."})
    }
    sys.database.collection('profiles').findOne(query, {projection:{_id:1, currentOTP:1}}, (err, doc) =>{
        if(!doc){
            return res.status(500).json({message:'No user with provided credentials was found'})
        }
        else if(doc.currentOTP == code){
            let jwt_rec = Auth.login_token({id:doc._id}, random('A0',30))
            profileSchema.updateOne({_id:doc._id}, {ref_token:jwt_rec.ref_token}, (er, dt) => {
                return res.status(200).json({message:"OTP was verified and session token was provided.",session_token:jwt_rec.session_token, ref_token:jwt_rec.ref_token})
            })
        }
    })    
}

export default Login