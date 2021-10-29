const express = require('express')
const {MongoClient} = require('mongodb')

const connectionString = process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017";


async function init(){
    const client = new MongoClient(connectionString, {
        useUnifiedTopology: true
    })

    await client.connect()

    const app = express()
    app.get('/get', (req, res)=> {
        const db = await client.db("blog")
        const collection = db.collection.blogs
    }) 

    
    const PORT = process.env.PORT || 3000
    
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
    
}
init()

