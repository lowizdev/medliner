const express = require("express");
const bodyParser = require('body-parser');
const zmq = require("zeromq");

const app = express();
const db = require('./data/sqlitedb.js');

let zmqSock = zmq.socket("push");
zmqSock.bindSync("tcp://127.0.0.1:3001");


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get("/", (req, res, next) => {

    console.log("Hello");

    res.send("hello");

});

//patient
app.get("/patient", (req, res, next) => {

    console.log("Patient");

    res.send("patients");

});

app.post("/patient", (req, res, next) => {

    console.log(req.body);

    //TODO: SANITIZE STRING
    //TODO: FILL MODEL AND APPLY BUSINESS VALIDATION RULES

    const sql = "INSERT INTO PATIENT (name, identifier, cellphone, smsOption, whatsappOption) VALUES (?, ?, ?, ?, ?)";

    db.run(sql, [req.body.name, req.body.identifier, req.body.cellphone, req.body.smsOption, req.body.whatsappOption]);

    res.status(200).send("Success");

});

//queue
app.get("/queue", (req, res, next) => {

    console.log("queues");

    res.send("queues");

});

app.post("/queue", (req, res, next) => {

    console.log(req.body);

    const sql = "INSERT INTO QUEUE (name, description, queue_date) VALUES (?, ?, ?)";

    db.run(sql, [req.body.name, req.body.description, req.body.date]);

    res.status(200).send("Success");

});

app.post("/queue/:queueId/patient", (req, res, next) => {

    console.log(req.params);

    const queueId = req.params.queueId;

    const sql = "INSERT INTO QUEUE_PATIENT (queue_id, patient_id) VALUES (?, ?)";

    db.run(sql, [queueId, req.body.patientId]);

    res.status(200).send("Success");

});

app.post("/queue/:queueId/next", async (req, res, next) => {

    //TODO: IT WOULD BE NICER TO USE THE QUEUE FRAMEWORK DIRECTLY INSTEAD OF STORING AND RETRIEVING FROM DATABASE, BUT THIS IS FOR DEMONSTRATION ONLY
    console.log(req.body);

    const queueId = req.params.queueId;

    zmqSock.send(JSON.stringify({queueId})); //TODO: DECOUPLE MESSAGE SENDING FUNCTIONALITY FROM QUEUE FRAMEWORK

    res.status(200).send("Success");

});

app.listen(3000);