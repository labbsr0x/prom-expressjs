const express = require("express"); 
const promclient = require("prom-client");
const { Monitor } = require("@labbsr0x/express-monitor");

const app = express(); 
Monitor.init(app, true);

// a generic endpoint to simulate a valid operation
app.all(/^(?!\/metrics$).*/, (req, res) => {
    setTimeout(() => {
        res.status(200).header("Content-Type", "text/plain").send(JSON.stringify({"success":true}));
    }, 4000);
})

// A RegisterDepedencyMetricsCallback will be automatically injected into the HealthCheckCallback
Monitor.watchDependencies((register) => {
    // here you implement the logic to go after your dependencies and check their health
    // the return must be an array of HealthCheckResult{name, status}
    register({ name: "Fake dependency 1", up: true});
    register({ name: "Fake dependency 2", up: false});
});

// runs the express app on port 23498
app.listen(23498)