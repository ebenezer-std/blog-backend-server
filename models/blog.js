const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema =new Schema({

    title: {
        type: String,
        required: true
    },
    // IDNo: {
    //     type: _id,
    //     required: true
    // },
    content: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    authorName:{
        type:String
    },
    likes: {
        type: Number,
    
    },
    unlikes: {
        type: Number,
    },


})

module.exports = mongoose.model('Blog', postSchema)