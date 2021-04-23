import crypt from 'bcrypt'
import sys from '../sys_conf.js'
import profileSchema from '../Schemas/Usr-profile.js'
import applSchema from '../Schemas/Usr-profile-appl.js'

function CreateUser(req, res){
    crypt.hash(req.body.Auth.password, 10, async(err, result)=>{
        req.body.Auth.password = result
        var query = {email: req.body.Auth.email}
        sys.database.collection('applications').findOne(query, async(err, doc) =>{
            if(err) throw err
            else if (!(doc.profile_id == 0)){
                return res.status(208).send({message:"The user with this email has already been verified."})
            }
            else if (req.body.code == doc.code){
               profileSchema.create(req.body).then(
                   async prof =>{
                       await applSchema.updateOne(query, {profile_id: prof._id})
                       res.status(202).send({message: "The profile has been successfully created to the server after verification."})
                   }
               ) 
            }
        })
    })
}

export default CreateUser