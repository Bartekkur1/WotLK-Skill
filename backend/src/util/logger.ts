import { configure, getLogger } from 'log4js';

configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'basic'
            }
        },
        file: {
            type: 'file',
            filename: 'wotlkskill.log'
        }
    },
    categories: {
        default: { appenders: ['out', 'file'], level: 'debug' }
    }
});

export const logger = getLogger();