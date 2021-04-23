import random from 'randomatic'
import sys from '../sys_conf.js'
import mondb from 'mongodb'
import crypt from 'bcrypt'
import profileSchema from "../Schemas/Usr-profile.js"

function OTP_gen(req, res){
    const Auth = req.body.Auth
    if (!Auth){
        return res.status(417).json({message:"No authenticaion data was provided."})
    }
    else if (!(Auth.email && Auth.password)){
        return res.status(406).json({message:"Proper authenticaion data was not filed."})
    }
    sys.database.collection('applications').findOne({email: Auth.email},{projection: {_id:0,profile_id:1}}, (err, doc) =>{
        if ((doc == null)){
            return res.status(404).json({message:"This email has never been registered in the IndoSphere application."})
        }
        else if(doc.profile_id == 0){
            return res.status(405).json({message:"This email address has not yet been verified"})
        }
        let query = {_id:mondb.ObjectID(doc.profile_id)}
        sys.database.collection('profiles').findOne(query,{projection:{_id:0, Auth:1}},(err, prdoc)=>{
            crypt.compare(Auth.password, prdoc.Auth.password, (err, correct)=>{
                if (correct){
                    var code = random('A0', 10)
                    var mailoptions = {
                        from: sys.server_email,
                        to: Auth.email,
                        subject: 'Request to login '+prdoc.Auth.username+' into the IndoSphere app.',
                        text: 'The server has recieved a request to login into the app with the credentials registered with email address. If this request was made by you, please enter the following code to successfully login:\n\t\t\t\t['+code+']'
                    }
                    sys.server_mail.sendMail(mailoptions, (err2, info) => {
                        profileSchema.updateOne(query,{currentOTP:code}, (err,found)=>{
                            return res.status(200).json({message:"OTP has been sent to the registered email address"})
                        })
                    })
                }
                else{
                    return res.status(401).json({message:"The password was incorrect"})
                }
            })
        } )
    })
}

export default OTP_gen