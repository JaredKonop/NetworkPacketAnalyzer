const express = require("express");
var bodyParser = require('body-parser')
var app = express()
const fs = require("fs");
const {
    PythonShell
} = require('python-shell');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
const {
    exec
} = require('child_process');

app.post("/submit", (req, res) => {
    var dataToSend;
    const time = parseInt(req.body.time)
    if (time < 15) {
        return res.status(400).json("Timeout should be greator than 15")
    }
    let options = {
        // mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
        // scriptPath: 'evesdrop.py', //If you are having python_test.py script in same folder, then it's optional.
        args: [time, req.body.interface] //An argument which can be accessed in the script using sys.argv[1]
    };


    PythonShell.run('evesdrop.py', options, function (err, result) {
        if (err) throw err;
        // result is an array consisting of messages collected
        //during execution of script.
        console.log('result: ', result.toString());
        dataToSend = result.toString()
        var exceCommand = dataToSend.split(",")
        exec(exceCommand[1], (err, stdout, stderr) => {
            if (err) {
                //some err occurred
                console.error(err)
            } else {
                // the *entire* stdout and stderr (buffered)
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);


                return res.status(200).send({
                    dataToshow: stderr,
                    pathToTXT: exceCommand[0]
                })
            }
        });
    });
});
app.post('/file', (req, res) => {
    const data = fs.readFileSync(__dirname + "/assets/txt/"+req.body.filePath, 'UTF-8');

    // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    lines.forEach((line) => {
        console.log(line)
    });
    res.send(lines)
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
