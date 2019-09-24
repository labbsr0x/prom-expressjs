# express-prom
Small repo with a full example of how to use NodeJS prom-client with ExpressJS

# run
Type on terminal to run:

```
> npm i
> npm start
```

Or just:

```
> docker run -d -p 23498:23498 labbsr0x/prom-expressjs:latest
```

Even better:

```
> docker-compose up
```

Then go to any random path on port `23498`, e.g. `http://localhost:23498/myname`.

The request will be registered by Prometheus and can be viewed at `http://localhost:23498/metrics`.