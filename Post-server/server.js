import Express from 'express'
import Cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'

const app = Express()

app.use(Cors())

const multerMid = multer({
    storage: multer.memoryStorage(),
    dest:'./Login',
    limits:{fileSize: 5 * 1024 * 1024,}
})
app.use(multerMid.single(''))
app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

