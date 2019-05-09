#!/bin/bash
cd /srv/www/express
pm2 start index.js -i 0
pm2 reload all