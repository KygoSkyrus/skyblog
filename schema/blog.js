const mongoose= require('mongoose');

        
const blogSchema = new mongoose.Schema({
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
    
},{collection:"blogs"});


//connecting with collection
module.exports = mongoose.model('BLOG', blogSchema); 