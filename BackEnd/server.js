
const express = require('express')
const cors = require('cors')
const routerUser = require('./routes/user')


const app = express()

// enable CORS (Cross Origin Resource Sharing)
// needed for client to call the apis from different url
app.use(cors('*'))

// add the json parser to parse the json data sent through
// the request body
app.use(express.json())

// find all the apis related to the user
app.use('/user', routerUser)


app.listen(5000, () => {
  console.log(`server started on port 5000`)
})
