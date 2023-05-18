const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();



app.use(express.static("Public"))
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})



app.post("/", function (req, res) {
    var fName = req.body.fname;
    var lName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    var url = "https://us21.api.mailchimp.com/3.0/lists/3777a8fcce";
    var options = {
        method: "POST",
        auth: "shantanu1:b60d641afb2abb400bfca2d2e8c9a8c3-us1"
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})



app.post("/failure", function (req, res) {
    res.redirect("/");
})



app.listen(3000, function () {
    console.log("Server is live");
})

//b60d641afb2abb400bfca2d2e8c9a8c3-us21 (APIKEY)
//3777a8fcce UniqueID(Audience)