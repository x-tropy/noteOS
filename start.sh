#!/bin/bash

# Start NGINX in the background
nginx

# Start the Rails server
exec ./bin/rails server -b 0.0.0.0 -p 3000
