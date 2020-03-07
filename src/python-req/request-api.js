// // import express JS module into app
// // and creates its variable.
// var express = require("express");
// var app = express();
// var callName = require("./function");

// // Creates a server which runs on port 3000 and
// // can be accessed through localhost:3000
// app.listen(3000, function() {
//   console.log("server running on port 3000");
// });

// // Function callName() is executed whenever
// // url is of the form localhost:3000/name
// app.get("/name", callName);

// // function callName(req, res) {
// //   var firstname = req.query.firstname;
// //   var lastname = req.query.lastname;
// //   var recipients = "0781894139";
// //   var message = "Hello test from python and Nodejs";
// //   var sender = "Olivier";
// //   //   console.log(data);

// //   // Use child_process.spawn method from
// //   // child_process module and assign it
// //   // to variable spawn
// //   var spawn = require("child_process").spawn;

// //   // Parameters passed in spawn -
// //   // 1. type_of_script
// //   // 2. list containing Path of the script
// //   //    and arguments for the script

// //   // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
// //   // so, first name = Mike and last name = Will
// //   var process = spawn("python", [
// //     "./request.py",
// //     firstname,
// //     lastname,
// //     recipients,
// //     message,
// //     sender
// //   ]);

// //   // Takes stdout data from script which executed
// //   // with arguments and send this data to res object
// //   process.stdout.on("data", function(data) {
// //     // var decod = JSON.parse(data);
// //     // console.log(decod.response[0].errors.action);
// //     // res.send(decod.response[0].errors);
// //     res.send(data);
// //   });
// // }

// // save code as start.js
