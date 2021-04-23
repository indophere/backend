import mailer from 'nodemailer'
import mongoose from 'mongoose'

const port = process.env.PORT || 8081
const secret_key = "17c400c266d76104c1f305bcf8271da814cdc3fd"
const saltround = 10
const server_email = "server.abiggj.app@gmail.com"
const server_mail = mailer.createTransport({
    service:'gmail',
    auth:{
        user: server_email,
        pass: "P1nkyS1ngh#"
    }
})

const db_conf = {
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}

const db_url = "mongodb+srv://abiggj:iamagoodboy@cluster0.0rfbj.mongodb.net/IndoSphere?retryWrites=true&w=majority"
mongoose.connect(db_url, db_conf)
const db = mongoose.connection

export default { port: port, key: secret_key, salt: saltround, server_mail:server_mail, server_email: server_email, database: db}