const { Router } = require('express')
const mongodb = require('mongodb')
const jwt = require('jsonwebtoken')
const router = Router()

require('dotenv').config()

let refreshTokens = []

router.get('/', async (req, res) => {
    try {
        const users = await loadUserCollection()
        res.send(await users.find({}).toArray())

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {

    const users = await loadUserCollection()
    
    await users.insertOne({
        username: req.body.username,
        password: req.body.password    
    })
    res.status(201).send()         
})

router.post('/Token', (req, res) => {
    const refreshToken = req.body.token
    //res.json( refreshToken)
    if (refreshToken == null) return res.json("NO TOKEN")
    if (!refreshTokens.includes(refreshToken)) return res.json( refreshTokens)

    jwt.verify(refreshToken, process.env.REFRESH_SECRET_TOKEN, (err, user) => {
        if (err) return res.Status(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json({ accessToken: accessToken })
    })
})

router.post('/Login', async (req, res) => {
    try {
        const username = req.body.username
        const user = { name: username}
        const accessToken = generateAccessToken(user)
        const refreshToken = jwt.sign(user, process.env.REFRESH_SECRET_TOKEN)
        refreshTokens.push(refreshToken)
        res.json({ accessToken: accessToken, refreshToken: refreshToken })
        
    } catch (error) {
        
    }
})


router.post('/Logout', (req,res) => {
    const refreshToken = req.body.data.token
    //res.json("REFRESH TOKEN: " + refreshToken)
    refreshTokens = refreshTokens.filter(token => token !== req.body.data.token)
    res.json(refreshTokens)
})
// IDK Why the delte isn't working
// router.delete('/Logout', (req,res) => {
//     const refreshToken = req.body.data.token
//     res.json("REFRESH TOKEN DELETE: " + refreshToken)
//     refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//     res.json(refreshTokens)
// })

router.get('/Login', async (req,res) => {
    res.json({poop: 'poop'})
})

async function loadUserCollection() {
    const client = await mongodb.MongoClient.connect(
        process.env.MONGO_URI, {
            useNewUrlParser: true
        })
    return client.db('Cluster0').collection('users')
}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '15s'})
}

module.exports = router