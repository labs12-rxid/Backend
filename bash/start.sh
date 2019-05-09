#!/bin/bash
cd /srv/www/express
/home/ubuntu/.nvm/versions/node/v12.2.0/bin/pm2 start index.js -i 0
/home/ubuntu/.nvm/versions/node/v12.2.0/bin/pm2 reload all