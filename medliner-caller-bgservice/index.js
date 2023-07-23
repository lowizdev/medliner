//const cron = require('node-cron');
const zmq = require("zeromq");

const sqlite3 = require("sqlite3").verbose();

//const cronTime = "*/5 * * * * *";

//cron.schedule(cronTime, async () => {});

const databaseURL = "../medliner-server/database.db"; //TODO: CHANGE TO SOMETHING MORE FORMAL. ALSO, DECOUPLE DATABASE.
let db = new sqlite3.Database(databaseURL);

let zmqSock = zmq.socket("pull");

zmqSock.connect("tcp://127.0.0.1:3001");
console.log("Worker connected to port 3001");

let messageHandler = function(message) {

    console.log("work: %s", message.toString());

    const queueMessage = JSON.parse(message);
    if(queueMessage.queueId){


        const query = "SELECT * FROM PATIENT p INNER JOIN QUEUE_PATIENT qp WHERE qp.queue_id = ? AND qp.serviced = 0 LIMIT 1";
        db.get(query, [queueMessage.queueId], (err, result) => { //TODO: USE PROMISES INSTEAD
            console.log("Result: " + result);
            console.log("Result: " + result.patient_id);

            if(result.whatsappOption == 1){
                console.log("NOW SENDING WHATSAPP MESSAGE TO: " + result.cellphone);
            }

            console.log("SENDING DEFAULT PUSH NOTIFICATION MESSAGE TO: " + result.cellphone);

        });
        

        //AND IN THE END, SET SERVICED TO TRUE
        //UPDATE QUEUE_PATIENT ...

    }
};

zmqSock.on("message", messageHandler);