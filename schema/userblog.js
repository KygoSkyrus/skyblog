const mongoose= require('mongoose');

        
const userblogSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    detail:{
        type: String,
    },
    url:{
        type: String,
        required: true
    },
    image:{
        type: String,

    },
    category:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    authorname:{
        type: String,
        required: true
    },
    shortdescription:{
        type: String,
    },
    metatitle:{
        type: String,

    },
    metakeywords:{
        type: String,

    },
    metadescription:{
        type: String,

    },
    date:{
        type: String,
        required: true
    },
    status:{
        type: String,
    },
    
},{collection:"userblog"});


//connecting with collection
module.exports = mongoose.model('USERBLOG', userblogSchema); 