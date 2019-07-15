"use strict";

const express = require("express");
const app = express();
const fs = require("fs");

app.set("views", __dirname);
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/')); // for access to build
app.use(express.static(__dirname + '/libs'));
app.use(express.static(__dirname + '/web'));

app.get("/", function(req, res){
    let tree = listFiles("");
    let data = {tree: "'" + JSON.stringify(tree) + "'"};
    res.render("index.ejs", data);
});
app.get("/web", function(req, res){
    fs.readFile(__dirname + '/web/viewer.html',
        {encoding: 'utf8'},
        function(err, html) {
            // ファイルの読み込みに失敗したらエラーのレスポンスを返す
            if (err) {
                res.statusCode = 500;
                res.end('Error!');
            }
            // ファイルの読み込みが成功したらHTMLを返す
            else {
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            }
        });
});

app.listen(8000, function(){
    console.log("client connected");
});

function listFiles(dir){
    let filelist = [];

    let files = fs.readdirSync("."+dir);
    files.filter(function(file){
        return fs.statSync("."+dir + "/" + file).isFile() && /.*\.pdf$/.test(file);
    }).forEach(function(file){
        filelist.push(file);
    });
    files.filter(function(file){
        return fs.statSync("."+dir + "/" + file).isDirectory();
    }).forEach(function(dn){
        let obj = {name: dir + "/" + dn, children: listFiles(dir + "/" + dn)};
        if (obj.children.length != 0){
            filelist.push(obj);
        }
    });

    return filelist;
}