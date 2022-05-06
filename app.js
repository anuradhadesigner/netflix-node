let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
// const mongoUrl = "mongodb://localhost:27017"
const mongoUrl = "mongodb+srv://developer:developer123@cluster0.r3psx.mongodb.net/netflix-node?retryWrites=true&w=majority"
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

//<<<All Movies >>>>
app.get('/movies',(req,res) =>{
    db.collection('movies').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
   // res.send("Get Location")
    })
})

//<<<<<<Genres List>>>>>

app.get('/genres',(req,res) =>{
    db.collection('genres').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//genres Details

app.get('/genres/:id',(req,res) =>{ 
    let movieId = Number(req.params.id)
    db.collection('genres').find({genres_id:movieId}).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//>>>movie Details>>>
app.get('/movies/:id',(req,res) =>{ 
    let movieId = Number(req.params.id)
    db.collection('movies').find({movie_id:movieId}).toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//movie display with particular genres id
// app.get('/info/:id',(req,res) =>{ 
//     let catId = Number(req.params.id)
//     console.log(catId)
//     db.collection('movies').find({genres_id:catId}).toArray((err, result) =>{
//         if(err) throw err;
//         res.send(result)
//     })
// })

//All category
app.get('/info',(req,res) =>{
    db.collection('category').find().toArray((err, result) =>{
        if(err) throw err;
        res.send(result)
    })
})

//movie display with particular category id
app.get('/catInfo', (req, res)=>
{
    let category = Number(req.query.category_id)
    //to get particular genre instead of everything
    let query = {};
    if(category)
    {
        query = {"category.category_id":category}
    }
    console.log(">>>>>category",category)
    db.collection('movies').find(query).toArray((err,result)=>
    {
        if (err) throw err;
        res.send(result)
    })
})

//movies displayed with res to genres
app.get('/movieInfo', (req, res)=>
{
    let genre = Number(req.query.genres_id)
    //to get particular genre instead of everything
    let query = {};
    if(genre)
    {
        query = {"genres.genres_id":genre}
    }
    console.log(">>>>>genre",genre)
    db.collection('movies').find(query).toArray((err,result)=>
    {
        if (err) throw err;
        res.send(result)
    })
})

// app.listen(port,() =>{
//     console.log(`Listing to the port ${port}`)
// })

// connecting with mongodb
MongoClient.connect(mongoUrl,(err,connection) =>{
    if(err) console.log('Error while connecting');
    db = connection.db('netflix-node');
    app.listen(port,() =>{
        console.log(`Listing to the port ${port}`)
    })
})
