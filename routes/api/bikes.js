const { Router } = require('express')
const jwt = require('jsonwebtoken')
const mongodb = require('mongodb')
const router = Router()

require('dotenv').config()

router.get('/', async (req, res) => {
    try {
        const bikes = await loadBikeCollection()
        res.send(await bikes.find({}).toArray())

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// router.get('/posts', authenticateToken,  (req, res) => {
//     try {
//         res.json(posts.filter(post => post.username === req.user.name))
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

//authenticateToken()
router.post('/', authenticateToken, async (req, res) => {
    const bikes = await loadBikeCollection()
    
    await bikes.insertOne({
        company: req.body.company,
        model: req.body.model,
        year: req.body.year,
        imageLocation: req.body.imageLocation,
        description: req.body.description
    })
    res.status(201).send()         
})

async function loadBikeCollection() {
    const client = await mongodb.MongoClient.connect(
        process.env.MONGO_URI, {
            useNewUrlParser: true
        })
    return client.db('Cluster0').collection('bikes')
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401)
        //return res.send('Need to log in to posts')
        //return res.json('Need to log in to posts')
    }    

    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
      if (err) return res.send(err + "YOU NOT LOG IN")
      //req.user = user
      next()//move on from middleware
    })
    
}

module.exports = router