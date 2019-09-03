FROM node:12.7.0 as BUILDER

ADD . /app/
RUN chmod 777 /app/startup.sh

WORKDIR /app/

RUN npm i

FROM flaviostutz/etcd-registrar:1.0.1 AS REGISTRAR

FROM node:12.7.0-alpine as RUNNER

COPY --from=BUILDER /app /app
COPY --from=REGISTRAR /bin/etcd-registrar /bin/etcd-registrar

WORKDIR /app

ENV REGISTRY_ETCD_URL ""
ENV REGISTRY_ETCD_BASE "/services"
ENV REGISTRY_SERVICE "example"
ENV REGISTRY_TTL "60"
ENV PORT "23498"

CMD ["sh", "startup.sh"]