const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const bikeRoutes = require('./routes/api/bikes'),
      imageRoutes = require('./routes/api/images')
const app = express()
const PORT = 4000
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => console.log('MongoDB database Connected...'))
.catch((err) => console.log(err))

app.use('/api/bikes', bikeRoutes)
app.use('/api/images', imageRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => console.log('App listening on port: ' + PORT))
