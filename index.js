const express = require ("express");
const bodyParser = require ("body-parser");
const { urlencoded } = require("body-parser");
const mongoose = require("mongoose");
const Post = require ('./src/models/postschema');


const app = express();

const db=mongoose.connect( "mongodb+srv://Devasri:Devasri@cluster0.2zswa.mongodb.net/Task?retryWrites=true&w=majority",
() => {
    console.log("DB connected")}
);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))


app.post("/Insert", async (req, res) => {
let title = req.body.title;
let author = req.body.author;
let content = req.body.content;
var post = new Post();
post.title = title;
post.author = author;
post.content = content;
post.save(function (error, savedPost) {
    if (error) {
        res.status(500).send({ error: "Unable to save Post " });
    } else {
        res.send(savedPost);
    }
});
});

app.get("/",function (req,res){
    Post.find({}, (err, doc) => {
    if (err) {
    res.status(500).send({ error: "unable to fetch" });
    }
    res.send(doc);
});
});

app.get("/posts",function(req,res){
    Post.find({ }, function(err,posts){
        if(err){
            res.status(404).send({error: "Unable to fetch post"});
        }
        else{
            res.send(posts)
        }

    })
})


app.post("/Delete", async (req, res) => {
let title = req.body.title;
Post.deleteOne({ title: title })
    .then(() => {
    res.status(200).send("Deleted");
    })
    .catch((err) => {
    res.send({ error: "Unable to Delete post" });
    });
});

app.post("/find", async (req, res) => {
var query = req.body.title;
Post.find({ title: query }, (err, doc) => {
    if (err) {
        res.status(500).send("Unable to fetch post");
    }
    res.send(doc);
});
});

app.post("/Update", async (req, res) => {
var title = await req.body.title;
var content = await req.body.content;
Post.findOneAndUpdate(
    { title: title },
    { content: content },
    { new: true },
    (err, doc) => {
    if (err) {
        res.status(500).send("Unable to update");
    } else {
        res.send(doc);
    }
    }
);
});
app.listen(3001, () => {
console.log("Server is running at port 3001");
});