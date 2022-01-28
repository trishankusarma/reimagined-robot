import app from './api/v1/app';
import https from 'https';
import chalk from 'chalk';
import { SERVER_PORT } from './config/configVar';
import connect from './db/mongoose';
import CONST from './config/consts';
import fs from 'fs';
import path from 'path';

const { PORT, CLIENT_URL } = process.env;

const options = {
    key: fs.readFileSync(path.join(__dirname, '../../../../etc/letsencrypt/live/accounts.ramanujanacademy.co.in', 'privkey.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../../../etc/letsencrypt/live/accounts.ramanujanacademy.co.in', 'cert.pem'))
};

//sockets initialized
const server = https.createServer(options, app);

server.listen(SERVER_PORT, () => {
    console.info(chalk.bgWhite.black.bold(`Connecting to Server on port ${SERVER_PORT}`));
    console.info(chalk.bgWhite.black.bold(`API templted by Jitul Teron`));
    connect();
});
