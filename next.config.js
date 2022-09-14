module.exports = {
    async headers() {
        return [
            {
                source: '/all-challenge',
                headers: [
                    {
                        key: 'WWW-Authenticate',
                        value: 'Basic realm="IR Stats"'
                    }
                ]
            }
        ]
    },
    webpack: (config) => {
        config.experiments = { ...config.experiments, ...{ topLevelAwait: true }};
        return config;
    }
}