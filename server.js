const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'config.env'})
const Recipe = require('./models/Recipe')
const User = require('./models/User')
// const {typeDefs}= require('./schema')
const {graphiqlExpress, graphqlExpress, gql, ApolloServer} = require('apollo-server-express')
const {makeExecutableSchema} = require('graphql-tools')
const {resolvers} = require('./resolvers')
const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding:'utf-8'}))

const app = express()
app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.use(async(req, res, next)=>{
    const token = req.headers['authorization']
    if(token !== null){
        try{
            const currentUser = await jwt.verify(JSON.parse(token), process.env.SECRET)
            req.currentUser = currentUser
        }catch(err){
        }
    }
    next()
})


const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req: {currentUser}})=>{
        return {
        Recipe, 
        User, 
        currentUser
    }}
})
apolloServer.applyMiddleware({app, path:'/graphql'})

// const schema = makeExecutableSchema({
//    typeDefs: typeDefs,
//    resolvers: resolvers
// })

// app.use('/graphql', graphiqlExpress({endpoint: '/graphql'}))

// app.use('/graphql', graphqlExpress({
//     schema,
//     context:{
//         Recipe, User
//     }
// }))

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("DB CONNECTED"))
    .catch(err => console.log(err.message))

const PORT = 4444 || process.env.PORT

app.get('/me', (req, res)=>{
    res.json({app:"app"})
})


app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`)
})

