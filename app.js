let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
// const mongoUrl = "mongodb://localhost:27017"
const mongoUrl = "mongodb+srv://developer:developer123@cluster0.r3psx.mongodb.net/netlix-node?retryWrites=true&w=majority"
const dotenv = require('dotenv');
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
let port = process.env.PORT || 8430;
var db;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

//get req
app.get('/',(req,res) =>{
    res.send("Welcome to express")
})

//All Movies 
app.get('/movie',(req,res) =>{
    db.collection('movie').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//All Movies 
app.get('/genres',(req,res) =>{
    db.collection('genres').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//movie Details
app.get('/movie/:id',(req,res) =>{ 
    let showId = Number(req.params.id)
    db.collection('movie').find({show_id:showId}).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})


// connecting with mongodb
MongoClient.connect(mongoUrl,(err,connection) =>{
    if(err) console.log('Error while connecting');
    db = connection.db('netflix-node');
    app.listen(port,() =>{
        console.log(`Listing to the port ${port}`)
    })
})
