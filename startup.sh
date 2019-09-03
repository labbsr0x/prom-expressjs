#!/bin/bash
set -e
set -x

if [ "$REGISTRY_ETCD_URL" != "" ]; then
    echo "[ETCD REGISTRAR] will register this Example. --etcd-url=$REGISTRY_ETCD_URL --etcd-base=$REGISTRY_ETCD_BASE --service=$REGISTRY_SERVICE --port=$PORT --ttl=$REGISTRY_TTL"
    etcd-registrar \
        --loglevel=info \
        --etcd-url=$REGISTRY_ETCD_URL \
        --etcd-base=$REGISTRY_ETCD_BASE \
        --service=$REGISTRY_SERVICE \
        --port=$PORT \
        --ttl=$REGISTRY_TTL&
else
    echo "[ETCD REGISTRAR] will not register this Example."&
fi

echo "Starting Prometheus Express Example..."
npm start