const {ApolloServer, gql}= require('apollo-server');
const express = require('express')
const app=express()

const {typeDefs}= require('./Schema')
const {resolvers}= require('./Resolvers')


const apollo = new ApolloServer({typeDefs,resolvers})
apollo.listen(1040).then(()=> console.log(`runi=`))


