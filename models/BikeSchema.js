const { Schema, model } = require('mongoose')

const BikeSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    description: {
        type: String
    },
    imageLocation: {
        type: String
    }
    // imageLocations: [{
    //     type: String
    // }],      
    // buyDate: {
    //     type: Date
    // },
    // sellDate: {
    //     type: Date
    // },
})

const BikeItem = model('bikeItem', BikeSchema)

module.exports = BikeItem