const mongoose= require('mongoose');

        
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    authorname: {
        type: String,
        required: true
    },
    shortdescription: {
        type: String,
        required: true
    },

    metatitle: {
        type: String,

    }, 
    metakeywords: {
        type: String,

    },
    metadescription: {
        type: String,
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
},{collection:"blogs"});


//connecting with collection
module.exports = mongoose.model('BLOG', blogSchema); 


let b={ 
    title: "venus is second planet",
    detail: "why it is though",
    url: "this is url",
    image: "img goes here",
    category: "category",
    type: "type of blog",
    authorname: "dg",
    shortdescription: "planets",
    metatitle: "", 
    metakeywords: "",
    metadescription: "",
    date: "12 jan 2022",
    status: "checked"
  }