#!/bin/bash

# Start Rails server
./bin/rails server -b 0.0.0.0 -p 5000 &

# Start Nginx
nginx -c $(pwd)/nginx.conf
