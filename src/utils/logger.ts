import logger from 'fluent-logger';

// The 2nd argument can be omitted. Here is a default value for options.
logger.configure('loki', {
  host: process.env.FLUENTD_HOST,
  port: Number(process.env.FLUENTD_PORT),
  timeout: Number(process.env.FLUENTD_TIMEOUT),
  reconnectInterval: Number(process.env.FLUENTD_RECONNECT_INTERVAL) // 10 minutes
});

export default logger