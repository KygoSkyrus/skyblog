const mongoose= require('mongoose');

        
const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    }
    
},{collection:"category"});


//connecting with collection
module.exports = mongoose.model('CATEGORY', categorySchema); 