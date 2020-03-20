const express = require('express');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
var multiparty = require('multiparty');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/search.html'));
});

app.post('/', function(req, res) {
    req.on('data', function(data) {
        MongoClient.connect(url, function(err, db) {
            obj = JSON.parse(data);
            if (err) throw err;
            var dbo = db.db("mydb");

            dbo.collection("youtube2").insertOne(obj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        })
    })
});


app.get('/history', function(req, res) {
    MongoClient.connect(url, function(err, db) {
        var dbo = db.db("mydb");
        data = dbo.collection("youtube2").find({}).toArray(function(err, result) {
            if (err) {
                console.log('err' + err);
            } else {
                console.log(result);
                res.send(result);
            };

        });

    })
});

app.listen(3000, () => console.log('Get app listening on port 3000!'));