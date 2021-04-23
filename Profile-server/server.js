import sys from './sys_conf.js'
import Express from 'express'
import createUser from './Create/Create_User.js'
import createAppl from './Create/Create_Application.js'
import login from './Login/Login.js'
import otp from './Login/OTP.js'
import refresh from './Login/Refresh.js'
import Cors from 'cors'

const app = Express()

app.use(Cors())
app.use(Express.json())

app.post('/create/application', createAppl)

app.post('/create/profile', createUser)

app.post('/login', login)

app.post('/login/otp', otp)

app.post('/login/refresh', refresh)

app.listen(sys.port, () => console.log('listening at localhost :' + sys.port))