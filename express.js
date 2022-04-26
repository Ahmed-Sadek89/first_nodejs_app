// required modules
const express = require('express');
const app = express();
const body_parser = require('body-parser');
const b_parser = body_parser.urlencoded({extended: true});
const path = require('path');
const {connectToDb, getDb} = require('./db');
const { ObjectId } = require('mongodb');

// setup the view and static setting
app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.static(path.join(__dirname, 'static')));

// setup the database connection using mongodb driver
let db;
connectToDb((error) => {
    if(!error){
        app.listen(3000, () => console.log('server is worked on port 3000'))
    }
    db = getDb()
})

// setup the routes
// 1- get request
app.get('/', (req, res) => {
    db.collection('books')
    .find()
    .sort({age: 1})
    .toArray()
    .then(result => {
        //res.status(200).json(result)
        res.render('index', {
           data: result 
        })
        // console.log(result)
    })
    .catch(() => {
        console.log('something went wrong')
    })
})

// 2- post request
app.post('/', b_parser, (req, res) => {
    console.log(req.body.hoppies)
    db.collection('books')
    .insertOne({
        name: req.body.name,
        age: parseInt(req.body.age),
        married: req.body.married === 'true' ? true : false,
        hoppies: typeof req.body.hoppies === 'string' ? [req.body.hoppies] : req.body.hoppies,
        parents: {
            father: req.body.father,
            mother: req.body.mother
        }
    }).then(() => {
        res.redirect('/')
    }).catch(error => {
        console.log(error.message())
    })
})

// 3- DELETE request
app.post('/delete/:id', (req, res) => {
    console.log(req.params.id);
    db.collection('books')
    .deleteOne({_id: ObjectId(req.params.id)})
    .then(() => {
        res.redirect('/')
    }).catch(error => {
        console.log(error.message())
    })
})

// 4- update request
// 41-- get the selected document
app.get('/update/:id', (req, res) => {
    const id = req.params.id;
    db.collection('books')
    .findOne({_id: ObjectId(id)})
    .then(result => {
        res.render('updateOne', {
            data: result
        })
        // res.status(200).json(result)
    }).catch(error => {
        console.log(error.message())
    })
})

//42-- update it
app.post('/update/:id', b_parser, (req, res) => {
    const id = req.params.id;
    db.collection('books')
    .updateOne(
        {_id: ObjectId(id)},
        {$set: {
            name: req.body.name,
            age: parseInt(req.body.age),
            married: req.body.married === 'true' ? true : false,
            hoppies: typeof req.body.hoppies === 'string' ? [req.body.hoppies] : req.body.hoppies,
            parents: {
                father: req.body.father,
                mother: req.body.mother
            }
        }}
    )
    .then(() => {
        res.redirect('/')
        // res.status(200).json(result)
    }).catch(error => {
        console.log(error.message())
    })
})