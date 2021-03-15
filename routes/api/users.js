const { Router } = require('express')
const mongodb = require('mongodb')
const router = Router()

require('dotenv').config()

router.get('/', async (req, res) => {
    try {
        const users = await loadUserCollection()
        res.send(await users.find({}).toArray())

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {

    const users = await loadUserCollection()
    
    await users.insertOne({
        username: req.body.username,
        password: req.body.password,
        joinedDate: req.body.joinedDate
    })
    res.status(201).send()         
})

async function loadUserCollection() {
    const client = await mongodb.MongoClient.connect(
        process.env.MONGO_URI, {
            useNewUrlParser: true
        })
    return client.db('Cluster0').collection('users')
}

module.exports = router