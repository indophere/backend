import sys from '../sys_conf.js'
import auth from '../../Auth.js'

function refresh(req, res){
    const ref_token = req.body.ref_token
    const query = {ref_token: ref_token}
    sys.db.collection('profiles').findOne(query, {projection:{_id:1}}, (err, doc)=>{
        let ses_tk = auth.token({id:doc._id})
        return res.status(200).json({message:"The token has been refreshed and a new session token has been provided.",session_token:ses_tk,})
    })
}

export default refresh