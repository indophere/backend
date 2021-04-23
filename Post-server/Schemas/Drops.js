import mongo from 'mongoose'

const Drop_Schema = mongo.Schema({
    Cloud_id:String,
    User_id:String,
    Spots:Number,
    Dots:[],
    DatePublished:{type:Date, default:Date.now}
})

const New_Drop_Schema = ({
    Drop_id:String,
    expiresAt:{
        type: Date,
        default: Date.now,
        index: {expires: '3d'},
    }
})

export default {Drop_Schema: mongo.model('Drops', Drop_Schema), New_Drop_Schema: mongo.model("NewDrops", New_Drop_Schema)}