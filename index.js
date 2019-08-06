const express = require("express"); 
const promclient = require("prom-client");

const app = express(); 

// a cumulative histogram to collect http request metrics in well-defined buckets of interest
const hist = new promclient.Histogram({
    name: "requests_seconds",
    help: "measure the number of requests processed and its duration in seconds separated by well-defined buckets of interest",
    buckets: [0.3, 1, 2, 5],
    labelNames: [ "status", "method", "url" ]
});

// middleware to capture prometheus metrics for the request
app.all(/^(?!\/metrics$).*/, (req, res, next) => {
    let end = hist.startTimer()
    next();
    res.once("finish", () => {
        end({"status": res.statusCode, "method":req.method, "url":req.url})
    });
})

// endpoint to collect all the registered metrics
app.get("/metrics", (req, res) => {
    res.status(200).header("Content-Type", "text/plain").send(promclient.register.metrics())
});

// a generic endpoint to simulate a valid operation
app.all(/^(?!\/metrics$).*/, (req, res) => {
    setTimeout(() => {
        res.status(200).header("Content-Type", "text/plain").send(JSON.stringify({"success":true}));
    }, 4000);
})

// runs the express app on port 23498
app.listen(23498)