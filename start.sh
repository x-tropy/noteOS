#!/bin/bash

# Start Rails server
./bin/rails server -b 127.0.0.1 -p 3000 &

# Start Nginx
nginx -c $(pwd)/nginx.conf
