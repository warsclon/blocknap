var figlet = require('figlet');

//Init
console.log(figlet.textSync('BlockNap Manager Server v0.0.1', {
    font: 'Doom',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}));

var express    = require('express');        
var app        = express();                 
var smart = require('./SmartContrarBlockNap.js')

app.use(express.json());
var port = process.env.PORT || 8080;
var router = express.Router();

smart.openAccount();

router.post('/insert', function(req, res) {
    console.log("--------------------");
    console.log("req:"+JSON.stringify(req.body));
    var info = req.body;
    smart.process(info,res);
});


app.use('/api', router);
app.listen(port);
console.log('Init Server:' + port);
