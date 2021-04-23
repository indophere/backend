import mongo from 'mongoose'

const Bead_Schema = mongo.Schema({
    User_id:String,
    ref_id:String,
    Cloud_id:String,
    Spots:Number,
    body: {type:String, maxLength:120},
    stringed:Boolean,
    strings:[],
    DatePublished:{type:Date, default:Date.now}
})

export default mongo.model