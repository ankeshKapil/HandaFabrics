const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

//var router= express.Router();

const app = express();

//app.use('/sendmailalert',router);
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.post('/sendmailalert',sendMailAlert);


const mailjet = require ('node-mailjet')
    .connect('fd25bdb6be4bbca6df43469dc04e7517', '301a3c6d5d3a2d1a29a68f37ae5e25b4')

    function sendMailAlert(req,res){
        console.log(req.body);
         const request = mailjet
     .post("send", {'version': 'v3.1'})
     .request({
         "Messages":[
                 {
                         "From": {
                                 "Email": "ankeshkapil85@gmail.com",
                                 "Name": "Ankesh Kapil"
                         },
                         "To": [
                                 {
                                         "Email": "handafabrics@gmail.com",
                                         "Name": "Vipul"
                                 },
                                 {
                                     "Email": "ankesh.kapil@gmail.com",
                                     "Name": "Ankesh"
                             }
                         ],
                         "Subject": "New order from  on Handa fibers site",
                         "TextPart": "New Order",
                         "HTMLPart": "<h3>FirstName:-"+req.body.firstName+"</h3>"+
                                     "<h3>LastName:"+req.body.lastName+"</h3>"+
                                     "<h3>address:"+req.body.address1+"</h3>"+
                                     "<h3>"+req.body.address2+"</h3>"+
                                     "<h3>country"+req.body.country+"</h3>"+
                                     "<h3>state"+req.body.state+"</h3>"+
                                     "<h3>zip"+req.body.zip+"</h3>"
                 } 
                                 
         ]
     })
 request
     .then((result) => {
         console.log(result.body)
     })
     .catch((err) => {
         console.log(err.statusCode)
     })
    }

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angularShop'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/angularShop/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);




