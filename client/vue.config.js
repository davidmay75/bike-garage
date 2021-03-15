module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                '/api': {
                    target: 'http://localhost:4000',
                    //target: 'http://[::1]:4000'
                },
            },
        },
        devtool: 'source-map'
    },

}
