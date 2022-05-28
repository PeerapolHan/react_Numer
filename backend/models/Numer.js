const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let numerSchema = new Schema({
    ffx:{
        type: String
    }
},  {
    collection: "numers"
})

module.exports = mongoose.model('Numer',numerSchema);
