import { format, createLogger, transports } from 'winston';
import createTransports from './libs/transports'
import config from '../../../config'

const { combine, timestamp, errors } = format;
const ownTransports = (() => createTransports({ format, transports, config }).logger())()

const logger = createLogger({
    format: combine(
        errors({ stack: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ),
    defaultMeta: { service: config.get('name') },
    transports: ownTransports
})


export default logger 