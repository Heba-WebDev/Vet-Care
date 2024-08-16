import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: 'info', // the lowest log level handled
    format: format.combine( // customize how log messages are formatted (console/files)
        format.timestamp(),
        format.errors({ stack: true }), // stack trace is included
        format.splat(), // enables string interpolation in log messages
        format.json()
    ),
    defaultMeta: { service: 'vetcare api'},
    transports: [ // where and how the log messages are output (console, files, db or external logging services)
        new transports.Console()
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        ),
    }));
}
