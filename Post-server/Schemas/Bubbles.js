import mongo from 'mongoose'

const Bubble_Schema = mongo.Schema({
    Cloud_id:String,
    User_id:String,
    Spots:Number,
    expiresAt:{
        type:Date,
        default: Date.now,
        index: {expires: '24h'}
    }
})

const Mirror_Bubble_Schema = mongo.Schema({
    Cloud_id:String,
    User_id: String
})

export default Bubble_Schema