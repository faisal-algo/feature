module.exports = function override(config, env) {
    config.devServer = {
        ...config.devServer,
        host: '127.0.0.1',
        port: 30080,
    };
    return config;
};
