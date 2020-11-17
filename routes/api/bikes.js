const { Router } = require('express')
// const { mongoUri } = require('../../config')
const mongodb = require('mongodb')
const BikeItem = require('../../models/BikeSchema')
const multer = require('multer')
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

router.post('/', async (req, res) => {
    const bikes = await loadBikeCollection()
    
    await bikes.insertOne({
        company: req.body.company,
        model: req.body.model,
        year: req.body.year,
        imageLocation: req.body.imageLocation
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

module.exports = router