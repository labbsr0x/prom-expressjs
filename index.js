const express = require("express");
const promclient = require("prom-client");

const app = express();
const hist = new promclient.Histogram({
    name: "requests_seconds",
    help: "measure the number of requests processed and its duration in seconds",
    buckets: [0.3, 1, 2, 5],
    labelNames: [ "status", "method", "url" ]
});

app.all(/^(?!\/metrics$).*/, (req, res, next) => {
    let end = hist.startTimer()
    next();
    res.once("finish", () => {
        end({"status": res.statusCode, "method":req.method, "url":req.url})
    });
})

app.get("/metrics", (req, res) => {
    res.status(200).header("Content-Type", "text/plain").send(promclient.register.metrics())
});

app.all(/^(?!\/metrics$).*/, (req, res) => {
    setTimeout(() => {
        res.status(200).header("Content-Type", "text/plain").send(JSON.stringify({"success":true}));
    }, 5000);
})

app.listen(23498)