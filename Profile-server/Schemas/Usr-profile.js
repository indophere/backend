import mongo from "mongoose"

const UsrProfile_Schema = mongo.Schema({
    Auth:{
        username:{type:String, reqired:true, unique:true},
        password:{type:String, required:true},
        email:{type:String, required:true, unique:true}
    },
    currentOTP:String,
    phone:Number,
    gender:String,
    location:String,
    ref_token:String,
    socialMedia:{
        type:Map,
        of:String
    },
    creations:{
        Drops:[],
        Beads:[],
        Bubbles:[],
        Pebbles:[]
    },
    relations:{
        friends:[],
        family:[],
        blocked:[]
    }
})

export default mongo.model('Profile', UsrProfile_Schema)