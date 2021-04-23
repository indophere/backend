import mongo from 'mongoose'

const UsrApplication_Schema = ({
    email:{type:String, required: true, unique:true},
    code:String,
    profile_id:{type:String, default:'0'}
})

export default mongo.model('Applications', UsrApplication_Schema)