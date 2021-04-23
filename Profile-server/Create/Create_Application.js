import random from 'randomatic'
import applSchema from '../Schemas/Usr-profile-appl.js'
import sys from '../sys_conf.js'

function Apply(req, res){
    const user_email = req.body.email
        sys.database.collection('applications').findOne({email:user_email}, (err,found) =>{
        if (!user_email){
            return res.status(406).json({message: 'No valid email address'})
        }
        if (found){
            return res.status(208).json({message: 'The email address has already been registered!'})
        }
        var code = random('A0', 10)
        var mailoptions = {
            from:sys.server_email,
            to:user_email,
            subject: 'Request recieved to create a new user ID through this verification email on the IndoSphere app.',
            text: "The server has recieved a request to create a new user ID with the email on ID: "+ user_email+" on the IndoSphere app server. If it was request submitted by you, please continue with the 10-letter code [["+code+"]] as the token to verify the request and complete the user verification and profile creation process on the server.\n\n Thanks,\nThe IndoSphere team"
        }
        sys.server_mail.sendMail(mailoptions, (err, info)=>{
            if (err){
                return console.log(err)
            }
            else{
                let data = {email: user_email, code: code}
                applSchema.create(data, (err, data)=> {
                    if (err){
                        return res.status(500).send(err)
                    }
                    else{
                        return res.status(201).json({message:'Application submitted and the email has been sent'})
                    }
                })
            }
        })
    })
}

export default Apply