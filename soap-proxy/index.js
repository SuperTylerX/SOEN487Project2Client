const express = require("express");
const app = express();
const axios = require("axios");

app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "content-type,soapaction");
    next();
});

app.post("/*", function(req, res) {
    let data = "";
    req.on("data", function(chunk) {
        data += chunk;
    });
    req.on("end", function() {
        postRes(req.url, data, function(response) {
            res.send(response);
        });
    });
});

app.get("/*", function(req, res) {
    getRes(req.url, function(data) {
        res.send(data);
    });
});

function getRes(url, callback) {
    axios({
            url: "http://localhost:8090" + url,
            method: "GET"
        })
        .then(data => {
            callback(data.data.replace(/localhost:8090/g, "localhost:9999"));
        })
        .catch(res => {
            console.log(res);
        });
}

function postRes(url, body, callback) {
    axios({
            url: "http://localhost:8090" + url,
            method: "POST",
            data: body,
            headers: {
                "Content-Type": "text/xml"
            }
        })
        .then(data => {
            callback(data.data);
        })
        .catch(data => {
            callback(data.response.data);
        });
}

const server = app.listen(9999, function() {
    const port = server.address().port;
    console.log("This proxy is running on http://localhost:" + port);
});