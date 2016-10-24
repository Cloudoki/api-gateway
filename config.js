exports = module.exports = {
  port: process.env.API_GW_PORT || 3000,
  logger: {
    name: process.env.API_GW_LOGGER_NAME || 'API-GW',
    level: process.env.API_GW_LOGGER_LEVEL || 'debug',
  },
};
