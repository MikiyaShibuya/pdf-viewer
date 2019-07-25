"use strict";

const express = require("express");
const app = express();
const fs = require("fs");

app.set("views", __dirname);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/')); // for accessing to build/
app.use(express.static(__dirname + '/libs')); // for accessing to libs like jquery
app.use(express.static(__dirname + '/web')); // for accessing to viewer sources

// register get request's response
app.get("/", function(req, res){
    // listing up pdf documents in tree structure
    let tree = listFiles("");
    // replace "test" in index.ejs to JSON string using ejs template engine
    let data = {tree: "'" + JSON.stringify(tree) + "'"};
    res.render("index.ejs", data);
});
// register web html request's response
app.get("/web", function(req, res){
    fs.readFile(__dirname + '/web/viewer.html',
        {encoding: 'utf8'},
        function(err, html) {
            if (err) {
                res.statusCode = 500;
                res.end('Error!');
            }
            // return normal get response
            else {
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            }
        });
});

// use 8000 as the port
app.listen(8000, function(){
    console.log("client connected");
});

// listing documents
function listFiles(dir){
    let filelist = [];

    // list up items in dir
    let files = fs.readdirSync("."+dir);
    // add item into filelist if it's a file for all
    files.filter(function(file){
        return fs.statSync("."+dir + "/" + file).isFile() && /.*\.pdf$/.test(file);
    }).forEach(function(file){
        filelist.push(file);
    });

    // add a tree of under the directory for all directories in files
    // the tree is made by listFiles() recursively 
    files.filter(function(file){
        return fs.statSync("."+dir + "/" + file).isDirectory();
    }).forEach(function(dn){
        let obj = {name: dn, children: listFiles(dir + "/" + dn)};
        if (obj.children.length != 0){
            filelist.push(obj);
        }
    });

    return filelist;
}