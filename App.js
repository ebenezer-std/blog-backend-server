const {ApolloServer, gql}= require('apollo-server');
const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const {BuildSchema} = require('graphql')
const mongoose = require('mongoose')
const Blog = require('./models/blog');
const { rejects } = require('assert');
const { title } = require('process');
const {MongoClient} = require('mongodb')


const app=express()
app.use(bodyParser.json())

/* const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qavb1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */

 mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qavb1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
 , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
let db = mongoose.connection;
db.on('error',()=>{
    console.error("Error connecting to the db")
})


const typeDefs = gql`

type Post{
    title: String!
    id: ID
    content: String!
    date: String
    author: Author
    comments: [Comment]
    likes: Int
    unlikes: Int


}

type Comment{
    name: String!
    content: String!

}

type Author{
    name: String!
    email: String!
    Hobbies: String
}

input PostInput{
    title: String!
    id: ID
    content: String!
    date: String
    author: String

}

type Query{
    posts: [Post!]!
    post(title: String): Post
    #post(author: String): Post
    #authors: [Author]!

     
}

type Mutation{
    createPost(input: PostInput!): Post!

}


`

const resolvers = {
    Query:{
        posts:(root)=>{
            return new Promise((res,rej)=>{
            Blog.find((err, blogs)=>{
                if(err) rej(err);
                else res(blogs)
            })    
            })

            
        },
        post:(root,{title}) =>{
            return new Promise((res,rej)=> {
                Blog.findOne({title:title},(err,posttitle)=>{
                    if (err) rej(err);
                    else res(posttitle);
                })
            })

        },
         post:(root,{author}) =>{
            return new Promise((res,rej)=> {
                Blog.findOne({title:title},(err,posttitle)=>{
                    if (err) rej(err);
                    else res(posttitle);
                })
            })

        }
    },
    Mutation:{
        createPost:(root, {input}) => {
            const newPost = new Blog({
                title: input.title,
                IDNo: input.id,
                authorName: input.author,
                content:input.content ,
                date:new Date(),
                likes: 17,
                unlikes:3
            

            })

            return new Promise((res,rej) =>{
                newPost.save((err)=>{
                    err? rej(err): res(newPost)
                })
            })
        }
    }
}

const apolo = new ApolloServer({typeDefs,resolvers})
apolo.listen(1040).then(()=> console.log(`runi=`))

