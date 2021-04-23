import random from 'randomatic'
import AWS from 'aws-sdk'

const s3 = new AWS.S3({
    accessKeyId:"AKIATPNBSYMNC45OYT4Y",
    secretAccessKey:"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",
    Bucket: 'indosphere-images'
})

const write_file = (req) => new Promise((resolve, reject) =>{
    var id_code = random('A0', 10)
    let type = req.file.mimetype
    let ext = req.file.mimetype.slice(req.file.mimetype.indexOf('/')+1)
    const originalname = req.user.id+'/'+id_code+'.'+ext
    let {buffer} = req.file
    let params = {
        Bucket:'tarang-images',
        Key:originalname,
        Body: buffer
    }
    s3.upload(params, (err, data)=>{
        if(err){
            console.log(err)
            return 0
        }
        else{
            resolve({key:data.key, type:type})
            return
        }
    })
})

export default write_file