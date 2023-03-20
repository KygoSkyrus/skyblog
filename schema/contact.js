const mongoose= require('mongoose');

        
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
    },
    address:{
        type: String,
    },
    note:{
        type: String,
        required: true
    },
    
},{collection:"contact"});


//connecting with collection
module.exports = mongoose.model('CONTACT', contactSchema); 