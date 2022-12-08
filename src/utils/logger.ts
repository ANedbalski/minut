import dayjs from 'dayjs';
import pino from 'pino';

const log = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        },
        times: () => `,"time": "${dayjs().format()}"`
    }
});

export default log;
