#!/bin/bash

# Start Rails server
./bin/rails server -b 127.0.0.1 -p 5000 &

# Wait until Rails server is ready before starting Nginx
while ! nc -z 127.0.0.1 5000; do
  sleep 0.1
done

# Start Nginx
nginx -c $(pwd)/nginx.conf
