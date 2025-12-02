const express=require("express");
const app=express();
const port=8080;
const path = require("path");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));


let books=[];

app.get('/',(req,res)=>{
    res.render('home.ejs',{books});
});

app.post('/book',(req,res)=>{
    books.push(req.body);
    res.redirect('/');
});

app.delete('/book/:id',(req,res)=>{
    let id = Number(req.params.id);
    books.splice(id,1);
    res.redirect('/');
});

app.get('/book/:id',(req,res)=>{
    let id=Number(req.params.id);
    let book=books[id];
    res.render('edit.ejs',{book,id});
});

app.put('/book/:id',(req,res)=>{
    let id=Number(req.params.id);
    books[id].bookName=req.body.newBookName;
    books[id].author=req.body.newAuthor;

    res.redirect('/');
});

app.listen(port,()=>{
    console.log("listening to port");
});
