import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import helmet from 'helmet';
import { MainRouter } from './routes';
import logger from '../../config/logger';
import CONST from '../../config/consts';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
const app: express.Application = express();
import multer from 'multer';
const upload = multer();
const { NAMESPACE } = CONST;

//middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
// app.use(morgan('dev'));

//  api call log
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    /// Log the req
    logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    // Log the res on finish
    res.on('finish', () => {
        logger.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});
// api creator
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ramanujan Management API',
            version: '1.0.0',
            description: 'Ramanujan Api for college management',
            contact: {
                name: 'Jitul Teron',
                url: 'http://jitul-teron-dev.herokuapp.com/',
                email: 'jitulteron9@gmail.com'
            },
            license: {
                name: 'MIT',
                url: 'https://opensource.org/licenses/MIT'
            }
        },
        servers: [
            {
                url: 'http://localhost:8080',
                description: 'Local Dev'
            },
            {
                url: 'http://ramanujanbaihata.vibe-xp.com/',
                description: 'Production '
            }
        ],

        consumes: ['application/json'],
        produces: ['application/json']
    },
    tags: [
        {
            name: 'Api for admin',
            description: 'API for admin in the system'
        }
    ],
    apis: [`${__dirname}/routes/admin.ts`]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
// console.log(swaggerDocs, 'swaggerDocs');

//doc
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//routes
app.use('/', MainRouter);

//error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(chalk.red(error));
    res.status(error.statusCode || 500).json({
        error: true,
        message: error.message || 'An Error Occured',
        route: req.url,
        name: error.name || 'InteralServerError'
    });
});

export default app;
