// function messageF(req, res) {
//   var firstname = "Olivierf";
//   var lastname = "Olivierl";
//   var recipients = "0781894139";
//   var message = "Hello test from python and Nodejs";
//   var sender = "Olivier";
//   //   console.log(data);

//   // Use child_process.spawn method from
//   // child_process module and assign it
//   // to variable spawn
//   var spawn = require("child_process").spawn;

//   // Parameters passed in spawn -
//   // 1. type_of_script
//   // 2. list containing Path of the script
//   //    and arguments for the script

//   // E.g : http://localhost:3000/name?firstname=Mike&lastname=Will
//   // so, first name = Mike and last name = Will
//   var process = spawn("python", [
//     "./request.py",
//     firstname,
//     lastname,
//     recipients,
//     message,
//     sender
//   ]);
//   process.stdout.on("data", function(data) {
//     // var decod = JSON.parse(data);
//     // console.log(decod.response[0].errors.action);
//     // res.send(decod.response[0].errors);
//     res.send(data);
//   });
// }

// module.exports = messageF;
