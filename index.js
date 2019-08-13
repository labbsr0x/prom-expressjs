const express = require("express"); 
const promclient = require("prom-client");
const { Monitor } = require("express-monitor");

const app = express(); 
Monitor.init(app, true);

// a generic endpoint to simulate a valid operation
app.all(/^(?!\/metrics$).*/, (req, res) => {
    setTimeout(() => {
        res.status(200).header("Content-Type", "text/plain").send(JSON.stringify({"success":true}));
    }, 4000);
})

// runs the express app on port 23498
app.listen(23498)